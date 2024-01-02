import contributors from "@/data/contributors";

export default function About() {
	return (
		<div className="mx-3 max-w-screen-xl px-3 pb-[20px] md:mx-auto md:px-4">
			<h1 className="text-main pt-5 text-center text-2xl font-bold">About the project</h1>
			<section>
				<h2 className="text-main mb-2 mt-5 text-xl">What is Dracania Archives?</h2>
				<p>
					Dracania Archives is a database of items from the game Drakensang Online, with the goal of expanding the
					website to include more features and informations about the game.
					<br />
					Images, fonts and other assets on this website are property of Bigpoint GmbH.
				</p>
			</section>
			<section>
				<h2 className="text-main mb-2 mt-5 text-xl">Community</h2>
				<p>
					We have a Discord server where you can discuss about the project, suggest new features and more.
					<br />
					You can join the server by clicking{" "}
					<a
						href="https://discord.gg/BJ9cdtjBmt"
						className="hover:text-main underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						here
					</a>
					.
					<br />
					You can also join the discussion section on GitHub by clicking{" "}
					<a
						href="https://github.com/MarcoAntolini/dracania-archives/discussions"
						className="hover:text-main underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						here
					</a>
					.
				</p>
			</section>
			<section>
				<h2 className="text-main mb-2 mt-5 text-xl">Contribution</h2>
				<p>
					Dracania Archives is an open source project created and maintained by{" "}
					<a
						href="https://marcoantolini.com/"
						className="hover:text-main underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Marco Antolini
					</a>{" "}
					(known in the community as h4nto) and it is not affiliated with Bigpoint GmbH or Drakensang Online.
					<br />
					The source code is available on{" "}
					<a
						href="https://github.com/MarcoAntolini/dracania-archives"
						className="hover:text-main underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>{" "}
					and you can contribute to the project by opening a pull request or an issue on GitHub.
				</p>
				<div className="pl-4">
					<h3 className="text-main mb-1 mt-2 text-lg">Contributors</h3>
					<ul className="list-inside list-disc">
						{contributors.map((contributor) => (
							<li key={contributor.name}>
								<a
									href={contributor.github}
									className="hover:text-main underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									{contributor.name}
								</a>{" "}
								(
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
						<li>Special thanks to VelveteenDuck and Voltrifrodec.</li>
					</ul>
				</div>
			</section>
		</div>
	);
}
