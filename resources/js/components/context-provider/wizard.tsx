import { createContext, useContext, useState, ReactNode, JSX, ComponentType, Dispatch, SetStateAction, useEffect } from "react"
import Wizard from "../wizard"
import { toast } from "sonner"
import { AxiosError } from "axios"

type Step = {
    title: string
    component: ReactNode
}

type WizardContextType = {
    steps: Step[]
    currentStep: number
    step: Step
    next: () => void
    prev: () => void
    canNext: boolean
    canPrev: boolean
    setCanNext: (value: boolean) => void
    setCanPrev: (value: boolean) => void
    setOnNext: Dispatch<SetStateAction<() => Promise<void>>>
    isLoading: boolean
    setCurrentStep: Dispatch<SetStateAction<number>>
}

const WizardContext = createContext<WizardContextType | null>(null)

export function WizardProvider({
    steps,
    initialStep = 0,
}: {
    steps: Step[]
    initialStep?: number
}) {
    const [currentStep, setCurrentStep] = useState(initialStep)
    const [canNext, setCanNext] = useState(true)
    const [canPrev, setCanPrev] = useState(initialStep > 0);
    const [onNext, setOnNext] = useState<() => Promise<void>>(() => () => new Promise<void>((resolve) => { resolve() }));
    const [isLoading, setIsLoading] = useState(false);

    const step = steps[currentStep > steps.length - 1 ? steps.length - 1 : currentStep]

    useEffect(() => {
        if (currentStep > steps.length - 1) {
            setCurrentStep(steps.length - 1)
        }
    }, [currentStep]);

    const next = () => {
        setIsLoading(true)
        onNext().then(() => {
            if (currentStep < steps.length - 1 && canNext) {
                setCurrentStep(s => s + 1)
            }
        }).catch((err) => {
            let message;
            if (err instanceof AxiosError) {
                message = err.response?.data.message
            }

            if (!message) {
                message = 'Periksa kembali input'
            }

            toast.error('Terjadi Kesalahan', {
                description: `${message}`,
            })

        })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1)
        }
    }

    return (
        <WizardContext.Provider
            value={{
                steps,
                currentStep,
                step,
                next,
                prev,
                canNext,
                canPrev,
                setCanNext,
                isLoading,
                setOnNext,
                setCanPrev,
                setCurrentStep
            }}
        >
            <Wizard />
        </WizardContext.Provider>
    )
}

export function useWizard() {
    const ctx = useContext(WizardContext)
    if (!ctx) throw new Error("useWizard must be used inside WizardProvider")
    return ctx
}
