<!--src/routes/+page.svelte-->
<script lang="ts">
	import logoLight from '$lib/assets/logos/followflow-logo-light.svg';
	import { resolve } from '$app/paths';
</script>

<main class="min-h-screen overflow-hidden bg-[var(--ff-bg)] text-[var(--ff-text)]">
	<section
		class="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-8 sm:px-6 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:py-16"
	>
		<div
			class="pointer-events-none absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(56,213,255,0.06)] blur-[100px] sm:h-[42rem] sm:w-[42rem] sm:blur-[120px]"
		></div>

		<div class="relative z-10">
			<a href={resolve('/')} class="inline-flex items-center transition-opacity hover:opacity-80">
				<img src={logoLight} alt="FollowFlow" class="h-5 w-auto sm:h-6" />
			</a>

			<p
				class="mt-12 text-xs font-semibold tracking-[0.12em] text-[var(--ff-cyan)] uppercase sm:mt-16 sm:text-sm"
			>
				AI follow-up command center
			</p>

			<h1
				class="mt-5 max-w-4xl text-[3.25rem] leading-[0.9] font-semibold tracking-tight sm:text-6xl md:text-7xl"
			>
				Your warmest leads, prioritized by AI.
			</h1>

			<p
				class="mt-6 max-w-2xl text-base leading-7 text-[var(--ff-text-muted)] sm:text-lg sm:leading-8"
			>
				FollowFlow helps small service businesses know who to follow up with next, why that lead
				matters, and what to say before momentum drops.
			</p>

			<div class="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
				<a href="/dashboard" class="ff-button-primary w-full px-5 py-3 text-sm sm:w-auto">
					View dashboard
				</a>

				<a
					href="https://github.com/jopearsondesigner/followflow"
					class="ff-button-secondary w-full px-5 py-3 text-sm sm:w-auto"
				>
					View GitHub
				</a>
			</div>
		</div>

		<div class="relative z-10">
			<div class="ff-section-shell">
				<p class="text-sm font-medium text-[var(--ff-cyan)]">Decision flow</p>

				<div class="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
					<div class="rounded-[var(--ff-radius-lg)] bg-[rgba(24,33,49,0.9)] p-4 sm:p-5">
						<p class="text-sm text-[var(--ff-text-muted)]">Start with</p>
						<p class="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Sarah Mitchell</p>
						<p class="mt-4 text-sm leading-6 text-[var(--ff-text-muted)] sm:text-base">
							Asked about timeline yesterday. No reply sent yet.
						</p>
					</div>

					<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
						<div class="rounded-[var(--ff-radius-md)] bg-[var(--ff-glass-surface)] p-4">
							<p class="text-3xl font-semibold">$2.4k</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">At risk</p>
						</div>

						<div class="rounded-[var(--ff-radius-md)] bg-[var(--ff-glass-surface)] p-4">
							<p class="text-3xl font-semibold">96</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">Urgency</p>
						</div>

						<div class="rounded-[var(--ff-radius-md)] bg-[var(--ff-glass-surface)] p-4">
							<p class="text-3xl font-semibold">1</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">Next action</p>
						</div>
					</div>

					<div
						class="rounded-[var(--ff-radius-lg)] border border-[rgba(56,213,255,0.1)] bg-[rgba(8,11,16,0.55)] p-4 sm:p-5"
					>
						<p class="text-sm font-medium text-[var(--ff-cyan)]">Suggested reply</p>
						<p class="mt-3 text-sm leading-7 text-[var(--ff-text-muted)] sm:text-base">
							Hi Sarah — I have availability this week if you’d like to talk through the next steps.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
