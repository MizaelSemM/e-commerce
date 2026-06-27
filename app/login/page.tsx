import { loginAction } from "../actions/auth-actions";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form action={loginAction} className="space-y-4 max-w-sm p-4">
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    {/* O atributo 'email' é o segredo aqui */}
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        required
                    />
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                    Entrar
                </Button>
            </form>
        </div>
    )
}