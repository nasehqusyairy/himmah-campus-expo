import { RefObject } from "react"

type FieldConfig = {
    value: string;
    y: number;
    width: number;
    fontSize: number;
    fontFamily: string;
    color: string;
};

export type CertificateConfig = {
    backgroundUrl: string;
    participantName: FieldConfig;
    certificateNumber: FieldConfig & { format: string };
}

type Props = {
    ref: RefObject<HTMLDivElement | null>
} & CertificateConfig

export default function Certificate({ ref, backgroundUrl, certificateNumber, participantName }: Props) {
    return (
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <div
                ref={ref}
                style={{
                    position: "relative",
                    height: `21cm`,
                    width: `29.7cm`,
                }}
            >
                <img src={backgroundUrl} style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }} />

                <div
                    style={{
                        position: 'absolute',
                        left: `calc(50% - ${certificateNumber.width / 2}px)`,
                        top: certificateNumber.y,
                        color: certificateNumber.color,
                        width: certificateNumber.width,
                        fontSize: certificateNumber.fontSize,
                        fontFamily: certificateNumber.fontFamily,
                        textAlign: "center",
                    }}
                >
                    {certificateNumber.value}{certificateNumber.format}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        left: `calc(50% - ${participantName.width / 2}px)`,
                        top: participantName.y,
                        color: participantName.color,
                        width: participantName.width,
                        fontSize: participantName.fontSize,
                        fontFamily: participantName.fontFamily,
                        textAlign: "center",
                        lineHeight: 1,
                    }}
                >
                    {participantName.value}
                </div>
            </div>
        </div>
    )
}