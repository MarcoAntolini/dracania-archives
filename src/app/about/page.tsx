import contributors from "@/data/contributors";
import Link from "next/link";

export default function About() {
	return (
		<div className="flex w-full flex-col items-center gap-10 px-6 py-10 text-gray-500 md:px-10">
			<h1 className="pt-5 text-center text-2xl font-bold text-custom-main">About the project</h1>
			<section className="w-full">
				<h2 className="mb-2 text-xl text-custom-main">What is Dracania Archives?</h2>
				<p>
					Dracania Archives is a community project for the game{" "}
					<Link
						href="https://www.drakensang.com/en"
						className="text-white underline transition-colors hover:text-custom-main"
						target="_blank"
						rel="noopener noreferrer"
					>
						Drakensang Online
					</Link>
					, with the goal of providing the players with a full database of anything they can find in the game, with the
					addition of some useful tools.
				</p>
				<p>
					Created and maintained by <span className="text-gray-400">Marco Antolini</span> (known in the community as{" "}
					<span className="text-gray-400">h4nto</span>), Dracania Archives operates independently and is not affiliated
					with Bigpoint GmbH or Drakensang Online. 📖
				</p>
			</section>
			<section className="w-full">
				<h2 className="mb-2 text-xl text-custom-main">Contribution</h2>
				<p>
					You can contribute to the project in many ways:
					<ul className="list-inside list-disc">
						<li>
							<span className="text-gray-400">Providing Feedback:</span> share your thoughts on our{" "}
							<Link
								href="https://discord.com/invite/cRc47h7Drh"
								className="text-white underline transition-colors hover:text-custom-main"
								target="_blank"
								rel="noopener noreferrer"
							>
								Discord server
							</Link>{" "}
							💬
						</li>
						<li>
							<span className="text-gray-400">Suggesting New Features or Reporting Bugs:</span> use the apposite form in
							the{" "}
							<Link href="/feedback" className="text-white underline transition-colors hover:text-custom-main">
								feedback page
							</Link>{" "}
							🐞
						</li>
						<li>
							<span className="text-gray-400">Contributing to the Code:</span> open a pull request on{" "}
							<Link
								href="https://github.com/MarcoAntolini/dracania-archives"
								className="text-white underline transition-colors hover:text-custom-main"
								target="_blank"
								rel="noopener noreferrer"
							>
								Github
							</Link>{" "}
							👨🏼‍💻
						</li>
						<li>
							<span className="text-gray-400">Donating to the Project:</span> support us with a donation to help cover
							server and domain costs. Your support is deeply appreciated! ❤️{" "}
							<Link href="/donate" className="text-white underline transition-colors hover:text-custom-main">
								Donate here!
							</Link>
						</li>
					</ul>
				</p>
				<div className="pl-4">
					<h3 className="mb-1 mt-2 text-lg text-custom-main">Contributors</h3>
					<ul className="list-inside list-disc">
						<li>
							Special thanks to <span className="text-gray-400">VelveteenDuck</span> and{" "}
							<span className="text-gray-400">Voltrifrodec</span>.
						</li>
						{contributors.map((contributor) => (
							<li key={contributor.name}>
								<span className="text-gray-400">{contributor.name}</span> (
								{Array.isArray(contributor.role)
									? contributor.role.map((role, i) => (
											<>
												{role}
												{i !== contributor.role.length - 1 && ", "}
											</>
										))
									: contributor.role}
								)
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}
