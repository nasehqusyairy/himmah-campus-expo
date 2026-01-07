import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import WizardSteps from "./wizard-steps"
import { useWizard } from "./context-provider/wizard"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Spinner } from "./ui/spinner"
import HeadingSmall from "./heading-small"

export default function Wizard() {
    const { canNext, canPrev, currentStep, next, prev, steps, step, isLoading } = useWizard()

    return (
        <>
            <WizardSteps steps={steps} activeStep={currentStep} />
            <Card className="min-h-[25rem] justify-between">
                <CardContent>
                    <HeadingSmall className="mb-4" title={step.title} description={`Tahap ${currentStep + 1} dari ${steps.length}`} />
                    {step.component}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant={"secondary"} disabled={!canPrev || !steps[currentStep - 1]} onClick={prev}><ArrowLeft /> Kembali</Button>
                    <Button disabled={!canNext || !steps[currentStep + 1] || isLoading} onClick={next}>
                        {isLoading ? (
                            <>
                                <Spinner /> Mengalihkan...
                            </>
                        ) : (
                            <>
                                Lanjut <ArrowRight />
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}