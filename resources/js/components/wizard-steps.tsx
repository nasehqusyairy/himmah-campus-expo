import { Card, CardContent } from "@/components/ui/card"
import WizardIndicator from "./wizard-indicator"
import { Fragment } from "react"

type Props = {
    steps: {
        title: string
    }[]
    activeStep: number
}

export default function WizardSteps({ steps, activeStep }: Props) {
    return (
        <Card className="mb-4">
            <CardContent>
                <div className="flex items-center justify-center">
                    {steps.map((step, index) => (
                        <Fragment key={index}>
                            <WizardIndicator
                                title={step.title}
                                value={index + 1}
                                active={index === activeStep}
                            />

                            {index < steps.length - 1 && (
                                <div className="w-8 border mx-2"></div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
