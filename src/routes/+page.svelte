<!--src/routes/+page.svelte-->
<script lang="ts">
	import logoLight from '$lib/assets/logos/followflow-logo-light.svg';
</script>

<main class="min-h-screen overflow-hidden bg-[var(--ff-bg)] text-[var(--ff-text)]">
	<section
		class="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr]"
	>
		<div
			class="pointer-events-none absolute top-1/2 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(56,213,255,0.06)] blur-[120px]"
		></div>

		<div class="relative z-10">
			<img src={logoLight} alt="FollowFlow" class="h-8 w-auto" />

			<p class="mt-16 text-sm font-semibold tracking-[0.12em] text-[var(--ff-cyan)] uppercase">
				AI follow-up command center
			</p>

			<h1 class="mt-5 max-w-4xl text-5xl leading-[0.94] font-semibold tracking-tight md:text-7xl">
				Your warmest leads, prioritized by AI.
			</h1>

			<p class="mt-6 max-w-2xl text-lg leading-8 text-[var(--ff-text-muted)]">
				FollowFlow helps small service businesses know who to follow up with next, why that lead
				matters, and what to say before momentum drops.
			</p>

			<div class="mt-9 flex flex-wrap gap-3">
				<a
					href="/dashboard"
					class="rounded-full bg-[var(--ff-cyan)] px-5 py-3 text-sm font-semibold text-[#041018] shadow-[0_0_28px_rgba(56,213,255,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(56,213,255,0.3)]"
				>
					View dashboard
				</a>

				<a
					href="https://github.com/jopearsondesigner/followflow"
					class="rounded-full border border-[rgba(56,213,255,0.28)] bg-[rgba(56,213,255,0.06)] px-5 py-3 text-sm font-semibold text-[var(--ff-cyan)] transition hover:bg-[rgba(56,213,255,0.12)]"
				>
					View GitHub
				</a>
			</div>
		</div>

		<div class="relative z-10 hidden lg:block">
			<div
				class="rounded-[2rem] border border-[rgba(56,213,255,0.12)] bg-[rgba(17,24,39,0.7)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md"
			>
				<p class="text-sm font-medium text-[var(--ff-cyan)]">Decision flow</p>

				<div class="mt-6 space-y-4">
					<div class="rounded-3xl bg-[rgba(24,33,49,0.9)] p-5">
						<p class="text-sm text-[var(--ff-text-muted)]">Start with</p>
						<p class="mt-2 text-4xl font-semibold tracking-tight">Sarah Mitchell</p>
						<p class="mt-4 text-[var(--ff-text-muted)]">
							Asked about timeline yesterday. No reply sent yet.
						</p>
					</div>

					<div class="grid grid-cols-3 gap-3">
						<div class="rounded-2xl bg-[var(--ff-glass-surface)] p-4">
							<p class="text-3xl font-semibold">$2.4k</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">At risk</p>
						</div>

						<div class="rounded-2xl bg-[var(--ff-glass-surface)] p-4">
							<p class="text-3xl font-semibold">96</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">Urgency</p>
						</div>

						<div class="rounded-2xl bg-[var(--ff-glass-surface)] p-4">
							<p class="text-3xl font-semibold">1</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">Next action</p>
						</div>
					</div>

					<div class="rounded-3xl border border-[rgba(56,213,255,0.1)] bg-[rgba(8,11,16,0.55)] p-5">
						<p class="text-sm font-medium text-[var(--ff-cyan)]">Suggested reply</p>
						<p class="mt-3 leading-7 text-[var(--ff-text-muted)]">
							Hi Sarah — I have availability this week if you’d like to talk through the next steps.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
