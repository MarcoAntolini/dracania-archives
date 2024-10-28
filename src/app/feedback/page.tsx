"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const feedbackSchema = z.object({
	feedback: z.string().min(20),
	email: z.optional(z.string().email()),
});

export default function FeedbackPage() {
	const form = useForm<z.infer<typeof feedbackSchema>>({
		defaultValues: {
			feedback: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
		if (data.feedback.length < 20) {
			toast.error("Feedback must be at least 20 characters.");
			return;
		}
		if (!data.email) {
			toast.success("Feedback submitted anonymously.");
		} else {
			toast.success(`Feedback submitted as ${data.email}.`);
		}
		await fetch("/api/send-feedback-email", {
			method: "POST",
			body: JSON.stringify(data),
		});
		form.reset();
	};

	return (
		<div className="flex flex-col items-center gap-8 p-5 md:p-10">
			<h1 className="text-2xl font-bold text-custom-main">Provide your feedback</h1>
			<p className="text-sm text-gray-500">
				Your feedback is important to us. Please share your thoughts and suggestions, or report any bugs you find.
			</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex w-full flex-col gap-5 md:min-w-[500px] md:max-w-[700px]"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Your email (optional)" />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="feedback"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Feedback</FormLabel>
								<FormControl>
									<Textarea {...field} className="h-40" placeholder="Your feedback" />
								</FormControl>
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
