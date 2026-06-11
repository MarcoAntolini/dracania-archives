"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useAction, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
	const { signIn } = useAuthActions();

	const router = useRouter();

	const [step, setStep] = useState<"signIn" | "signUp">("signIn");

	const [isLoading, setIsLoading] = useState(false);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const user = useQuery(api.queries.users.getUserByUsername, { username });
	const validatePassword = useAction(api.authAction.validatePassword);
	const userExists = useQuery(api.queries.users.getUserByUsername, { username });

	async function handleSignIn(formData: FormData) {
		if (!user) {
			toast.error("Username does not exist");
			return;
		}
		if (
			!(await validatePassword({
				username,
				password,
			}))
		) {
			toast.error("Invalid password");
			return;
		}
		await signIn("password", formData).then(() => router.push("/user-settings"));
	}

	async function handleSignUp(formData: FormData) {
		if (password !== passwordConfirmation) {
			toast.error("Passwords do not match");
			return;
		}
		if (userExists) {
			toast.error("Username already exists");
			return;
		}
		await signIn("password", formData).then(() => router.push("/user-settings"));
	}

	return (
		<div className="relative flex flex-col items-center gap-12 px-6 py-10 md:px-10">
			<h1 className="text-2xl font-bold text-custom-main">Login or create an account</h1>
			<form
				className="flex w-full max-w-md flex-col gap-4"
				onSubmit={async (event) => {
					event.preventDefault();
					setIsLoading(true);
					const formData = new FormData(event.currentTarget);
					if (password === "" || username === "") {
						toast.error("Password and username cannot be empty");
						setIsLoading(false);
						return;
					}
					if (step === "signIn") {
						await handleSignIn(formData);
					} else {
						await handleSignUp(formData);
					}
					setIsLoading(false);
				}}
			>
				<Input
					name="email"
					placeholder="Username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<PasswordInput
					name="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{step === "signUp" && (
					<PasswordInput
						placeholder="Confirm password"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>
				)}
				<Input name="flow" type="hidden" value={step} />
				<Button type="submit" disabled={isLoading}>
					{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : step === "signIn" ? "Sign in" : "Sign up"}
				</Button>
				<Button
					variant="link"
					onClick={(e) => {
						e.preventDefault();
						setUsername("");
						setPassword("");
						setPasswordConfirmation("");
						setStep(step === "signIn" ? "signUp" : "signIn");
					}}
				>
					{step === "signIn" ? "Create an account" : "Back to sign in"}
				</Button>
			</form>
		</div>
	);
}
