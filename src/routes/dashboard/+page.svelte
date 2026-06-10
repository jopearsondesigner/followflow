<!--src/routes/dashboard/+page.svelte-->
<script lang="ts">
	import logoLight from '$lib/assets/logos/followflow-logo-light.svg';
	import { resolve } from '$app/paths';
	import { leads } from '$lib/data/leads';
	import type { ReplyTone } from '$lib/types/lead';

	const tones: ReplyTone[] = ['Friendly', 'Concise', 'Urgency-Aware'];

	const activeLeads = leads.filter((lead) => !lead.followedUp);
	const totalRevenueAtRisk = activeLeads.reduce((total, lead) => total + lead.estimatedValue, 0);
	const criticalLeads = activeLeads.filter((lead) => lead.urgencyScore >= 90).length;

	let selectedLead = $state(activeLeads[0]);
	let selectedTone = $state<ReplyTone>('Friendly');

	const getActionLabel = (score: number) => {
		if (score >= 90) return 'Needs response today';
		if (score >= 75) return 'Follow up this week';
		if (score >= 55) return 'Re-engage soon';
		return 'Low-pressure check-in';
	};

	const getSignalColor = (score: number) => {
		if (score >= 90) return 'var(--ff-cyan)';
		if (score >= 75) return 'var(--ff-amber)';
		if (score >= 55) return 'var(--ff-coral)';
		return 'var(--ff-text-muted)';
	};

	const getSignalGlow = (score: number) => {
		if (score >= 90) return 'rgba(56, 213, 255, 0.16)';
		if (score >= 75) return 'rgba(255, 184, 107, 0.14)';
		if (score >= 55) return 'rgba(255, 107, 122, 0.14)';
		return 'rgba(167, 176, 190, 0.1)';
	};

	const getMomentumWidth = (score: number) => `${score}%`;
</script>

<svelte:head>
	<title>FollowFlow Dashboard Demo</title>
	<meta
		name="description"
		content="Interactive FollowFlow dashboard demo showing prioritized follow-up signals, revenue at risk, and suggested replies."
	/>
</svelte:head>

<main class="ff-page-bg min-h-screen overflow-hidden text-[var(--ff-text)]">
	<header
		class="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.055)] bg-[rgba(8,11,16,0.68)] shadow-[0_1px_0_rgba(255,255,255,0.025)] backdrop-blur-xl"
	>
		<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:h-16 md:px-6">
			<a href={resolve('/')} class="inline-flex items-center transition-opacity hover:opacity-85">
				<img src={logoLight} alt="FollowFlow" class="h-5 w-auto md:h-6" />
			</a>

			<div class="flex items-center gap-3">
				<p class="hidden text-sm text-[var(--ff-text-muted)] sm:block">Dashboard demo</p>

				<a
					href={resolve('/')}
					class="ff-button-secondary px-3.5 py-2 text-[0.8125rem] md:px-4 md:text-sm"
				>
					Back to site
				</a>
			</div>
		</div>
	</header>

	<section class="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
		<header class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-10">
			<div>
				<p class="text-sm font-semibold tracking-[0.14em] text-[var(--ff-cyan)] uppercase">
					Today’s Flow
				</p>

				<h1
					class="mt-5 max-w-4xl text-[2.8rem] leading-[0.92] font-semibold tracking-[-0.06em] sm:text-6xl md:text-7xl"
				>
					Move the lead before momentum drops.
				</h1>

				<p
					class="mt-6 max-w-2xl text-base leading-7 text-[var(--ff-text-muted)] sm:text-lg sm:leading-8"
				>
					FollowFlow turns scattered follow-up signals into one clear next move — who to contact,
					why it matters, and what to say while the window is still active.
				</p>
			</div>

			<div class="grid gap-3 sm:grid-cols-3 lg:gap-4">
				<div class="ff-kpi-card ff-kpi-card-cyan">
					<p class="text-xs font-semibold tracking-[0.12em] text-[var(--ff-cyan)] uppercase">
						Active signals
					</p>

					<p
						class="mt-3 text-4xl leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em]"
					>
						{activeLeads.length}
					</p>

					<p class="mt-2 text-xs leading-5 text-[var(--ff-text-muted)]">need review today</p>
				</div>

				<div class="ff-kpi-card ff-kpi-card-amber">
					<p class="text-xs font-semibold tracking-[0.12em] text-[var(--ff-amber)] uppercase">
						Revenue at risk
					</p>

					<p
						class="mt-3 text-4xl leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em]"
					>
						${(totalRevenueAtRisk / 1000).toFixed(1)}k
					</p>

					<p class="mt-2 text-xs leading-5 text-[var(--ff-text-muted)]">open opportunity</p>
				</div>

				<div class="ff-kpi-card ff-kpi-card-mint">
					<p class="text-xs font-semibold tracking-[0.12em] text-[var(--ff-mint)] uppercase">
						Critical opportunity
					</p>

					<p
						class="mt-3 text-4xl leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em]"
					>
						{criticalLeads}
					</p>

					<p class="mt-2 text-xs leading-5 text-[var(--ff-text-muted)]">needs first action</p>
				</div>
			</div>
		</header>

		<section class="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] xl:gap-7">
			<section class="flex flex-col gap-6">
				<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p class="text-sm text-[var(--ff-text-muted)]">Decision feed</p>

						<h2
							class="mt-2 text-[2.15rem] leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.045em] sm:text-[2.45rem]"
						>
							Start with this lead
						</h2>
					</div>

					<p class="text-sm text-[rgba(244,247,250,0.64)]">
						Priority based on signal strength and timing
					</p>
				</div>

				<div class="relative">
					<div
						class="pointer-events-none absolute inset-0 -z-10 scale-105 rounded-[2rem] blur-[80px]"
						style={`background: radial-gradient(circle, ${getSignalGlow(
							selectedLead.urgencyScore
						)} 0%, rgba(56, 213, 255, 0.045) 34%, transparent 72%);`}
					></div>

					<div class="ff-primary-lead-card">
						<div class="flex flex-wrap items-center justify-between gap-4">
							<p
								class="rounded-[var(--ff-radius-sm)] border border-[rgba(56,213,255,0.24)] bg-[rgba(56,213,255,0.06)] px-3 py-1 text-[0.72rem] font-semibold tracking-[0.08em] text-[var(--ff-cyan)] uppercase"
							>
								Recommended first action
							</p>

							<div class="flex items-center gap-2 text-sm text-[var(--ff-text-muted)]">
								<span
									class="h-2 w-2 rounded-full"
									style={`background: ${getSignalColor(selectedLead.urgencyScore)}`}
								></span>

								<span>${selectedLead.estimatedValue.toLocaleString()} at risk</span>
							</div>
						</div>

						<div class="mt-7 flex items-stretch gap-4 sm:gap-5">
							<div
								class="w-1.5 shrink-0 rounded-full"
								style={`background: ${getSignalColor(selectedLead.urgencyScore)}`}
							></div>

							<div class="min-w-0 flex-1">
								<h3
									class="text-[2.65rem] leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.055em] sm:text-5xl md:text-6xl"
								>
									{selectedLead.name}
								</h3>

								<p class="mt-3 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.business} · {selectedLead.interest}
								</p>

								<p
									class="mt-6 max-w-3xl text-base leading-7 text-[var(--ff-text)] sm:text-lg sm:leading-8"
								>
									{selectedLead.recommendedNextStep}
								</p>

								<div class="mt-7">
									<div class="mb-2 flex items-center justify-between gap-4 text-xs">
										<span class="text-[var(--ff-text-muted)]">
											{getActionLabel(selectedLead.urgencyScore)}
										</span>

										<span class="font-medium text-[var(--ff-cyan)]">
											{selectedLead.urgencyScore} urgency
										</span>
									</div>

									<div class="h-1.5 overflow-hidden rounded-full bg-[rgba(8,11,16,0.72)]">
										<div
											class="h-full rounded-full shadow-[0_0_18px_rgba(56,213,255,0.28)]"
											style={`width: ${getMomentumWidth(selectedLead.urgencyScore)}; background: ${getSignalColor(
												selectedLead.urgencyScore
											)}`}
										></div>
									</div>
								</div>
							</div>
						</div>

						<div class="mt-7 grid gap-3 sm:grid-cols-3">
							<div class="ff-mini-signal">
								<p class="text-xs font-semibold tracking-[0.1em] text-[var(--ff-cyan)] uppercase">
									Evidence
								</p>

								<p class="mt-2 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.lastInteraction}
								</p>
							</div>

							<div class="ff-mini-signal">
								<p class="text-xs font-semibold tracking-[0.1em] text-[var(--ff-amber)] uppercase">
									Risk
								</p>

								<p class="mt-2 text-sm leading-6 text-[var(--ff-text-muted)]">
									Momentum can cool without a reply.
								</p>
							</div>

							<div class="ff-mini-signal">
								<p class="text-xs font-semibold tracking-[0.1em] text-[var(--ff-mint)] uppercase">
									Action
								</p>

								<p class="mt-2 text-sm leading-6 text-[var(--ff-text-muted)]">
									Send a clear next-step message.
								</p>
							</div>
						</div>
					</div>
				</div>

				<section class="ff-dashboard-panel">
					<div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p class="text-sm text-[var(--ff-text-muted)]">Queue</p>

							<h2 class="mt-1 text-2xl font-semibold tracking-tight">Next in the queue</h2>
						</div>

						<p class="text-sm text-[var(--ff-text-muted)]">Click any lead to refocus the brief</p>
					</div>

					<div class="grid gap-3">
						{#each activeLeads as lead (lead.id)}
							{#if lead.id !== selectedLead.id}
								<button
									type="button"
									aria-label={`Select ${lead.name}`}
									onclick={() => (selectedLead = lead)}
									class="group ff-queue-card"
								>
									<div
										class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
									>
										<div class="flex min-w-0 items-center gap-4">
											<div
												class="h-11 w-1.5 shrink-0 rounded-full shadow-[0_0_18px_rgba(56,213,255,0.12)]"
												style={`background: ${getSignalColor(lead.urgencyScore)}`}
											></div>

											<div class="min-w-0">
												<h3 class="truncate text-lg font-semibold tracking-tight">{lead.name}</h3>

												<p class="mt-1 line-clamp-2 text-sm leading-6 text-[var(--ff-text-muted)]">
													{lead.recommendedNextStep}
												</p>
											</div>
										</div>

										<div class="shrink-0 text-left sm:text-right">
											<p class="text-xs text-[var(--ff-text-muted)]">
												{getActionLabel(lead.urgencyScore)}
											</p>

											<p class="mt-1 font-semibold text-[var(--ff-text)]">
												${lead.estimatedValue.toLocaleString()}
											</p>
										</div>
									</div>
								</button>
							{/if}
						{/each}
					</div>
				</section>
			</section>

			<aside class="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
				<section class="ff-dashboard-panel">
					<p class="text-sm font-medium text-[var(--ff-cyan)]">Why this lead is first</p>

					<h2 class="mt-4 text-2xl font-semibold tracking-tight">Evidence → Risk → Action</h2>

					<div class="mt-6 space-y-4">
						<div class="ff-era-card ff-era-card-evidence">
							<div class="flex items-center justify-between gap-3">
								<p class="text-sm font-semibold text-[var(--ff-text)]">Evidence</p>
								<p class="text-xs font-medium text-[var(--ff-cyan)]">Signal found</p>
							</div>

							<div class="mt-3 space-y-2 text-sm leading-6 text-[var(--ff-text-muted)]">
								<p>{selectedLead.lastInteraction}</p>
								<p>No reply has been sent yet.</p>
								<p>${selectedLead.estimatedValue.toLocaleString()} opportunity is still active.</p>
							</div>
						</div>

						<div class="ff-era-card ff-era-card-risk">
							<div class="flex items-center justify-between gap-3">
								<p class="text-sm font-semibold text-[var(--ff-text)]">Risk</p>
								<p class="text-xs font-medium text-[var(--ff-amber)]">Momentum window</p>
							</div>

							<p class="mt-3 text-sm leading-6 text-[var(--ff-text-muted)]">
								{selectedLead.aiInsight}
							</p>
						</div>

						<div class="ff-era-card ff-era-card-action">
							<div class="flex items-center justify-between gap-3">
								<p class="text-sm font-semibold text-[var(--ff-text)]">Action</p>
								<p class="text-xs font-medium text-[var(--ff-mint)]">Next best move</p>
							</div>

							<p class="mt-3 text-sm leading-6 text-[var(--ff-text-muted)]">
								{selectedLead.recommendedNextStep}
							</p>
						</div>
					</div>
				</section>

				<section class="ff-dashboard-panel">
					<div class="flex items-start justify-between gap-4">
						<div>
							<p class="text-sm font-medium text-[var(--ff-cyan)]">Suggested reply</p>

							<h2 class="mt-3 text-2xl font-semibold tracking-tight">Ready to send</h2>
						</div>

						<div
							class="rounded-[var(--ff-radius-sm)] border border-[rgba(94,242,184,0.18)] bg-[rgba(94,242,184,0.055)] px-3 py-1 text-xs font-semibold text-[var(--ff-mint)]"
						>
							{selectedTone}
						</div>
					</div>

					<div class="mt-5 flex flex-wrap gap-2">
						{#each tones as tone (tone)}
							<button
								type="button"
								onclick={() => (selectedTone = tone)}
								class={`ff-tone-button ${selectedTone === tone ? 'ff-tone-button-active' : ''}`}
							>
								{tone}
							</button>
						{/each}
					</div>

					<div
						class="mt-5 rounded-[var(--ff-radius-lg)] border border-[rgba(56,213,255,0.11)] bg-[rgba(8,11,16,0.54)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]"
					>
						<p class="leading-7 text-[var(--ff-text)]">
							{selectedLead.suggestedReplies[selectedTone][0]}
						</p>
					</div>

					<div class="mt-5 flex flex-col gap-3 sm:flex-row">
						<button class="ff-button-primary w-full px-4 py-2.5 text-sm sm:w-auto">
							Use suggested reply
						</button>

						<button class="ff-button-secondary w-full px-4 py-2.5 text-sm sm:w-auto">
							Copy draft
						</button>
					</div>
				</section>
			</aside>
		</section>
	</section>
</main>
