import { Eye, EyeOff } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group";
import { InputHTMLAttributes, useState } from "react";

export default function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup>
            <InputGroupInput
                type={showPassword ? "text" : "password"}
                {...props}
            />
            <InputGroupAddon align={'inline-end'}>
                <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    )
}