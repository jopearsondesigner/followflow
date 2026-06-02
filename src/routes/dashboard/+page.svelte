<!--src/routes/dashboard/+page.svelte-->
<script lang="ts">
	import logoLight from '$lib/assets/logos/followflow-logo-light.svg';
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

<main class="min-h-screen bg-[var(--ff-bg)] px-6 py-6 text-[var(--ff-text)]">
	<section class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
		<section class="flex flex-col gap-5">
			<header class="border-b border-[var(--ff-border)] pb-7">
				<img src={logoLight} alt="FollowFlow" class="h-7 w-auto" />

				<div class="mt-10">
					<p class="text-sm font-medium text-[var(--ff-cyan)]">Today’s Flow</p>

					<h1 class="mt-3 max-w-xl text-6xl leading-[0.92] font-semibold tracking-tight">
						Move the lead before momentum drops.
					</h1>

					<div class="mt-7 flex flex-wrap gap-3 text-sm">
						<div class="rounded-full bg-[var(--ff-surface)] px-4 py-2 text-[var(--ff-text-muted)]">
							{activeLeads.length} active signals
						</div>

						<div class="rounded-full bg-[var(--ff-surface)] px-4 py-2 text-[var(--ff-text-muted)]">
							${totalRevenueAtRisk.toLocaleString()} at risk
						</div>

						<div class="rounded-full bg-[var(--ff-surface)] px-4 py-2 text-[var(--ff-text-muted)]">
							{criticalLeads} critical opportunity
						</div>
					</div>
				</div>
			</header>

			<section class="rounded-[2rem] border border-[var(--ff-border)] bg-[var(--ff-surface)] p-6">
				<div class="mb-5 flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Who needs attention now</h2>

					<p class="text-sm text-[var(--ff-text-muted)]">{activeLeads.length} active signals</p>
				</div>

				<div class="flex flex-col gap-3">
					{#each activeLeads as lead (lead.id)}
						<button
							type="button"
							aria-label={`Select ${lead.name}`}
							onclick={() => (selectedLead = lead)}
							class={`group w-full rounded-[1.35rem] border p-5 text-left transition ${
								selectedLead.id === lead.id
									? 'border-[var(--ff-cyan)] bg-[#1b2638] shadow-[0_0_0_1px_rgba(56,213,255,0.35),0_0_48px_rgba(56,213,255,0.12)]'
									: 'border-[var(--ff-border)] bg-[var(--ff-surface-elevated)] hover:border-[var(--ff-cyan)]/60'
							}`}
						>
							<div class="flex items-stretch gap-4">
								<div
									class="w-1 shrink-0 rounded-full"
									style={`background: ${getSignalColor(lead.urgencyScore)}`}
								></div>

								<div class="flex flex-1 items-start justify-between gap-5">
									<div class="min-w-0 flex-1">
										<div class="flex items-center gap-3">
											<span
												class="h-2.5 w-2.5 rounded-full"
												style={`background: ${getSignalColor(lead.urgencyScore)}`}
											></span>

											<h3 class="truncate text-lg font-semibold">{lead.name}</h3>
										</div>

										<p class="mt-1 text-sm text-[var(--ff-text-muted)]">
											{lead.business} · {lead.interest}
										</p>

										<div class="mt-4">
											<div class="mb-2 flex items-center justify-between text-xs">
												<span class="text-[var(--ff-text-muted)]">
													{getActionLabel(lead.urgencyScore)}
												</span>

												<span class="text-[var(--ff-cyan)]">Momentum active</span>
											</div>

											<div class="h-1.5 overflow-hidden rounded-full bg-[#0b111c]">
												<div
													class="h-full rounded-full"
													style={`width: ${getMomentumWidth(lead.urgencyScore)}; background: ${getSignalColor(lead.urgencyScore)}`}
												></div>
											</div>
										</div>

										<p class="mt-4 text-sm leading-6 text-[var(--ff-text)]">
											{lead.recommendedNextStep}
										</p>
									</div>

									<div class="shrink-0 text-right">
										<p class="text-xs text-[var(--ff-text-muted)]">At risk</p>
										<p class="mt-1 text-lg font-semibold">
											${lead.estimatedValue.toLocaleString()}
										</p>
									</div>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</section>
		</section>

		<aside class="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
			<section
				class="rounded-[2rem] bg-[var(--ff-surface)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
			>
				<p class="text-sm font-medium text-[var(--ff-cyan)]">Momentum timeline</p>

				<h2 class="mt-4 text-3xl font-semibold tracking-tight">{selectedLead.name}</h2>

				<p class="mt-2 text-[var(--ff-text-muted)]">
					Follow-up window is active. Silence is starting to cost momentum.
				</p>

				<div class="mt-6 rounded-3xl bg-[var(--ff-surface-elevated)] p-5">
					<div class="flex items-center justify-between text-xs text-[var(--ff-text-muted)]">
						<span>Engagement signal</span>
						<span>{getActionLabel(selectedLead.urgencyScore)}</span>
					</div>

					<div class="relative mt-5 h-2 rounded-full bg-[#0b111c]">
						<div
							class="h-full rounded-full"
							style={`width: ${selectedLead.urgencyScore}%; background: ${getSignalColor(selectedLead.urgencyScore)}`}
						></div>

						<div
							class="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[var(--ff-bg)] shadow-[0_0_22px_rgba(56,213,255,0.55)]"
							style={`left: calc(${selectedLead.urgencyScore}% - 8px); background: ${getSignalColor(selectedLead.urgencyScore)}`}
						></div>
					</div>

					<div class="mt-6 space-y-4">
						<div class="flex gap-3">
							<div class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--ff-mint)]"></div>
							<div>
								<p class="text-sm font-medium">Signal detected</p>
								<p class="mt-1 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.lastInteraction}
								</p>
							</div>
						</div>

						<div class="flex gap-3">
							<div class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--ff-amber)]"></div>
							<div>
								<p class="text-sm font-medium">Momentum risk</p>
								<p class="mt-1 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.aiInsight}
								</p>
							</div>
						</div>

						<div class="flex gap-3">
							<div class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--ff-cyan)]"></div>
							<div>
								<p class="text-sm font-medium">Recommended move</p>
								<p class="mt-1 text-sm leading-6 text-[var(--ff-text-muted)]">
									{selectedLead.recommendedNextStep}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section
				class="rounded-[2rem] bg-[var(--ff-surface-elevated)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
			>
				<p class="text-sm font-medium text-[var(--ff-cyan)]">Suggested reply</p>

				<div class="mt-4 flex flex-wrap gap-2">
					{#each tones as tone (tone)}
						<button
							type="button"
							onclick={() => (selectedTone = tone)}
							class={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
								selectedTone === tone
									? 'border-[var(--ff-cyan)] bg-[var(--ff-cyan)] text-[var(--ff-bg)]'
									: 'border-[var(--ff-border)] text-[var(--ff-text-muted)] hover:border-[var(--ff-cyan)] hover:text-[var(--ff-text)]'
							}`}
						>
							{tone}
						</button>
					{/each}
				</div>

				<div class="mt-5 rounded-3xl bg-[#101827] p-5">
					<p class="leading-7 text-[var(--ff-text)]">
						{selectedLead.suggestedReplies[selectedTone][0]}
					</p>
				</div>

				<button
					class="mt-5 rounded-full bg-[var(--ff-cyan)] px-4 py-2 text-sm font-semibold text-[var(--ff-bg)]"
				>
					Use suggested reply
				</button>
			</section>
		</aside>
	</section>
</main>
