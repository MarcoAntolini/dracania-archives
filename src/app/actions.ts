import type { Item } from "@/types/items";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import Stripe from "stripe";

const mailerSend = new MailerSend({
	apiKey: process.env.MAILERSEND_API_KEY as string,
});

const stripe = new Stripe(process.env.STRIPE_KEY as string);

export const sendFeedbackEmail = async ({ feedback, email }: { feedback: string; email?: string }) => {
	const emailParams = new EmailParams()
		.setFrom(new Sender("feedback@dracania-archives.com", "Dracania Archives Feedback"))
		.setTo([new Recipient("marcoantolini.dev@gmail.com", "Marco Antolini")])
		.setSubject(`New Feedback from ${email ?? "Anonymous"}`)
		.setText(feedback);
	await mailerSend.email.send(emailParams);
};

export const sendHourlyContributionEmail = async ({ items }: { items: Item[] }) => {
	const emailParams = new EmailParams()
		.setFrom(new Sender("contributor@dracania-archives.com", "Dracania Archives Feedback"))
		.setTo([new Recipient("marcoantolini.dev@gmail.com", "Marco Antolini")])
		.setSubject(`New items awaiting approval`).setText(`
			There are ${items.length} new items awaiting approval:
			${items.map((item) => `- ${item.name} (${item.class})`).join("\n")}
		`);
	await mailerSend.email.send(emailParams);
};

export const sendContributionEmail = async ({
	type,
	class: className,
	name,
}: {
	type: string;
	class: string;
	name: string;
}) => {
	const emailParams = new EmailParams()
		.setFrom(new Sender("contributor@dracania-archives.com", "Dracania Archives Contributor"))
		.setTo([new Recipient("marcoantolini.dev@gmail.com", "Marco Antolini")])
		.setSubject(`New ${className} ${type} contribution for Dracania Archives: ${name}`)
		.setText(
			`The new ${type} ${className.toLowerCase()} has been added and is awaiting review:\nhttps://dashboard.convex.dev/t/marcoantolini/dso-db-contribute/intent-mule-355/data?table=${type}s&filters=${
				type === "item"
					? "eyJjbGF1c2VzIjpbeyJvcCI6ImVxIiwiaWQiOiIwLjkzMTI2OTEzNDI2OTU4MDUiLCJmaWVsZCI6ImFwcHJvdmVkIiwidmFsdWUiOmZhbHNlfV19"
					: "eyJjbGF1c2VzIjpbeyJvcCI6ImVxIiwiaWQiOiIwLjI4MzUwNTg3MTQyOTY0MSIsImZpZWxkIjoiYXBwcm92ZWQiLCJ2YWx1ZSI6ZmFsc2V9XX0"
			}`,
		);
	await mailerSend.email.send(emailParams);
};

export const sendPaymentEmail = async () => {
	const emailParams = new EmailParams()
		.setFrom(new Sender("donations@dracania-archives.com", "Dracania Archives Donations"))
		.setTo([new Recipient("marcoantolini.dev@gmail.com", "Marco Antolini")])
		.setSubject("New donation for Dracania Archives")
		.setText(
			"A new donation has been made to Dracania Archives. Check the dashboard to verify it: https://dashboard.stripe.com/dashboard.",
		);
	await mailerSend.email.send(emailParams);
};

export const createCheckoutSession = async ({ username, origin }: { username: string; origin: string }) => {
	const isDev = process.env.NODE_ENV === "development";
	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [{ price: isDev ? "price_1QC5MzCW3bRJsu38XrZc564U" : "price_1QBeikCW3bRJsu38Pc9z9WT0", quantity: 1 }],
			submit_type: "donate",
			custom_fields: [
				{
					key: "name",
					label: {
						type: "custom",
						custom: "Name",
					},
					type: "text",
					text: {
						default_value: username,
					},
					optional: true,
				},
			],
			mode: "payment",
			payment_method_types: ["card", "paypal"],
			success_url: `${origin}/donate/success?sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/donate/canceled?sessionId={CHECKOUT_SESSION_ID}`,
		});
		return session.url;
	} catch (error) {
		return null;
	}
};

export const verifyPayment = async ({ sessionId }: { sessionId: string }) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		return {
			payment_status: session.payment_status,
			username: session.customer_details?.name,
			email: session.customer_details?.email,
			// receipt_email: session.customer_details?.email,
			// amount: session.amount_total,
			// currency: session.currency,
		};
	} catch (error) {
		return null;
	}
};
