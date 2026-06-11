import { StaticImage as Image } from "@/components/ui/static-image";

export function MaintenancePage() {
	return (
		<div className="relative min-h-[100svh] w-full overflow-hidden">
			<Image
				src="/images/game/loading_ce.png"
				alt=""
				fill
				className="object-cover object-center"
				loading="eager"
				decoding="async"
			/>
			<div className="absolute inset-0 z-[1] bg-black/50" aria-hidden="true" />
			<div className="relative z-10 flex min-h-[100svh] items-center justify-center p-4 sm:p-8">
				<section
					aria-live="polite"
					className="w-full max-w-2xl rounded-lg border border-amber-400/70 bg-amber-950/60 p-6 text-center shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-8"
				>
					<p className="text-sm uppercase tracking-[0.3em] text-amber-300">Maintenance Mode</p>
					<h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">We&apos;ll be back soon.</h1>
					<p className="mx-auto mt-4 max-w-xl text-base text-amber-100/90 sm:text-lg">
						We&apos;re working on the website at the moment and are sorry for any inconvenience. Thank you for your
						patience.
					</p>
				</section>
			</div>
		</div>
	);
}
