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

	const getMomentumWidth = (score: number) => `${score}%`;
</script>

<main class="min-h-screen bg-[var(--ff-bg)] px-5 py-6 text-[var(--ff-text)] sm:px-6 sm:py-8">
	<section class="mx-auto max-w-7xl">
		<header class="grid gap-8 pb-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
			<div>
				<a href={resolve('/')} class="inline-flex items-center transition-opacity hover:opacity-80">
					<img src={logoLight} alt="FollowFlow" class="h-5 w-auto sm:h-6" />
				</a>

				<div class="mt-10 sm:mt-12">
					<p class="text-sm font-medium text-[var(--ff-cyan)]">Today’s Flow</p>

					<h1
						class="mt-4 max-w-3xl text-[3rem] leading-[0.92] font-semibold tracking-tight sm:text-5xl md:text-6xl"
					>
						Move the lead before momentum drops.
					</h1>
				</div>
			</div>

			<div
				class="overflow-hidden rounded-[var(--ff-radius-md)] border border-[rgba(255,255,255,0.07)] bg-[rgba(12,19,33,0.45)] lg:self-end"
			>
				<div
					class="divide-y divide-[rgba(255,255,255,0.07)] sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:block lg:divide-x-0 lg:divide-y"
				>
					<div class="flex items-end justify-between gap-5 px-5 py-4">
						<p class="text-sm text-[var(--ff-text-muted)]">Active signals</p>

						<p
							class="text-4xl leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em]"
						>
							{activeLeads.length}
						</p>
					</div>

					<div class="flex items-end justify-between gap-5 px-5 py-4">
						<p class="text-sm text-[var(--ff-text-muted)]">Revenue at risk</p>

						<p
							class="text-4xl leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em]"
						>
							${(totalRevenueAtRisk / 1000).toFixed(1)}k
						</p>
					</div>

					<div class="flex items-end justify-between gap-5 px-5 py-4">
						<p class="text-sm text-[var(--ff-text-muted)]">Critical opportunity</p>

						<p
							class="text-4xl leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em]"
						>
							{criticalLeads}
						</p>
					</div>
				</div>
			</div>
		</header>

		<section class="grid gap-6 pt-4 lg:grid-cols-[1.1fr_0.9fr]">
			<section class="flex flex-col gap-6">
				<div>
					<p class="text-sm text-[var(--ff-text-muted)]">Decision feed</p>
					<h2
						class="mt-2 text-[2.1rem] leading-none font-[var(--ff-font-display)] font-medium tracking-[-0.045em] sm:text-[2.35rem]"
					>
						Start with this lead
					</h2>
				</div>

				<div class="relative">
					<div
						class="pointer-events-none absolute inset-0 -z-10 scale-110 blur-[70px]"
						style="
							background:
								radial-gradient(
									circle,
									rgba(56, 213, 255, 0.08) 0%,
									rgba(56, 213, 255, 0.04) 35%,
									transparent 75%
								);
						"
					></div>

					<div
						class="rounded-[var(--ff-radius-xl)] border border-[rgba(56,213,255,0.22)] bg-[#1b2638] p-5 shadow-[0_0_80px_rgba(56,213,255,0.08)] sm:p-7"
					>
						<div class="flex flex-wrap items-center justify-between gap-4">
							<p
								class="rounded-[var(--ff-radius-sm)] border border-[rgba(56,213,255,0.24)] bg-[rgba(56,213,255,0.06)] px-3 py-1 text-[0.72rem] font-semibold tracking-[0.08em] text-[var(--ff-cyan)] uppercase"
							>
								Recommended first action
							</p>

							<p class="text-sm text-[var(--ff-text-muted)]">
								${selectedLead.estimatedValue.toLocaleString()} at risk
							</p>
						</div>

						<div class="mt-7 flex items-stretch gap-4 sm:gap-5">
							<div
								class="w-1.5 shrink-0 rounded-full"
								style={`background: ${getSignalColor(selectedLead.urgencyScore)}`}
							></div>

							<div class="min-w-0 flex-1">
								<h3
									class="text-[2.75rem] leading-none font-[var(--ff-font-display)] font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl"
								>
									{selectedLead.name}
								</h3>

								<p class="mt-2 text-sm text-[var(--ff-text-muted)]">
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
										<span class="text-[var(--ff-cyan)]">Window is active</span>
									</div>

									<div class="h-1.5 overflow-hidden rounded-full bg-[#0b111c]">
										<div
											class="h-full rounded-full"
											style={`width: ${getMomentumWidth(selectedLead.urgencyScore)}; background: ${getSignalColor(selectedLead.urgencyScore)}`}
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<section class="border-t border-[var(--ff-border)] pt-6">
					<div class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<h2 class="text-2xl font-semibold tracking-tight">Next in the queue</h2>
						<p class="text-sm text-[var(--ff-text-muted)]">Click any lead to refocus the brief</p>
					</div>

					<div class="divide-y divide-[var(--ff-border)]">
						{#each activeLeads as lead (lead.id)}
							{#if lead.id !== selectedLead.id}
								<button
									type="button"
									aria-label={`Select ${lead.name}`}
									onclick={() => (selectedLead = lead)}
									class="group w-full rounded-[var(--ff-radius-lg)] px-3 py-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(24,33,49,0.45)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] sm:px-4"
								>
									<div
										class="flex flex-col gap-4 rounded-[var(--ff-radius-lg)] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
									>
										<div class="flex min-w-0 items-center gap-4">
											<div
												class="h-10 w-1 shrink-0 rounded-full"
												style={`background: ${getSignalColor(lead.urgencyScore)}`}
											></div>

											<div class="min-w-0">
												<h3 class="truncate text-lg font-semibold">{lead.name}</h3>
												<p
													class="mt-1 line-clamp-2 text-sm text-[var(--ff-text-muted)] sm:truncate"
												>
													{lead.recommendedNextStep}
												</p>
											</div>
										</div>

										<div class="shrink-0 text-left sm:text-right">
											<p class="text-xs text-[var(--ff-text-muted)]">
												{getActionLabel(lead.urgencyScore)}
											</p>
											<p class="mt-1 font-semibold">${lead.estimatedValue.toLocaleString()}</p>
										</div>
									</div>
								</button>
							{/if}
						{/each}
					</div>
				</section>
			</section>

			<aside class="flex flex-col gap-5 lg:sticky lg:top-8 lg:self-start">
				<section
					class="rounded-[var(--ff-radius-xl)] border border-[rgba(56,213,255,0.08)] bg-[var(--ff-surface)] p-5 shadow-[0_0_40px_rgba(56,213,255,0.04)] sm:p-6"
				>
					<p class="text-sm font-medium text-[var(--ff-cyan)]">Why this lead is first</p>

					<h2 class="mt-4 text-2xl font-semibold tracking-tight">Evidence → Risk → Action</h2>

					<div class="mt-6 p-1">
						<div class="space-y-5">
							<div>
								<p class="text-sm font-semibold text-[var(--ff-text)]">Evidence</p>

								<div class="mt-3 space-y-3 text-sm leading-6 text-[var(--ff-text-muted)]">
									<p>• {selectedLead.lastInteraction}</p>
									<p>• No reply has been sent yet</p>
									<p>
										• ${selectedLead.estimatedValue.toLocaleString()} opportunity is still active
									</p>
								</div>
							</div>

							<div class="h-px bg-[var(--ff-border)]"></div>

							<div>
								<p class="text-sm font-semibold text-[var(--ff-text)]">Risk</p>

								<p class="mt-3 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.aiInsight}
								</p>
							</div>

							<div class="h-px bg-[var(--ff-border)]"></div>

							<div>
								<p class="text-sm font-semibold text-[var(--ff-text)]">Recommended action</p>

								<p class="mt-3 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.recommendedNextStep}
								</p>
							</div>
						</div>
					</div>
				</section>

				<section
					class="rounded-[var(--ff-radius-xl)] border border-[rgba(167,176,190,0.08)] bg-[rgba(17,24,39,0.58)] p-5 backdrop-blur-sm sm:p-6"
				>
					<p class="text-sm font-medium text-[var(--ff-cyan)]">Suggested reply</p>

					<div class="mt-4 flex flex-wrap gap-2">
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

					<div class="mt-5 rounded-[var(--ff-radius-lg)] bg-[#101827] p-5">
						<p class="leading-7 text-[var(--ff-text)]">
							{selectedLead.suggestedReplies[selectedTone][0]}
						</p>
					</div>

					<button class="ff-button-secondary mt-5 w-full px-4 py-2 text-sm sm:w-auto">
						Use suggested reply
					</button>
				</section>
			</aside>
		</section>
	</section>
</main>
