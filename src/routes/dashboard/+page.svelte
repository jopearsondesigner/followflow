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

					<div class="mt-8 grid max-w-xl grid-cols-3 gap-3">
						<div class="rounded-2xl bg-[var(--ff-surface)] px-4 py-4">
							<p class="text-2xl font-semibold tracking-tight">{activeLeads.length}</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">Active signals</p>
						</div>

						<div class="rounded-2xl bg-[var(--ff-surface)] px-4 py-4">
							<p class="text-2xl font-semibold tracking-tight">
								${(totalRevenueAtRisk / 1000).toFixed(1)}k
							</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">At risk</p>
						</div>

						<div class="rounded-2xl bg-[var(--ff-surface)] px-4 py-4">
							<p class="text-2xl font-semibold tracking-tight">{criticalLeads}</p>
							<p class="mt-1 text-xs text-[var(--ff-text-muted)]">Critical</p>
						</div>
					</div>
				</div>
			</header>

			<section class="rounded-[2rem] border border-[var(--ff-border)] bg-[var(--ff-surface)] p-6">
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-semibold">Today’s priority</h2>
					<p class="text-sm text-[var(--ff-text-muted)]">{activeLeads.length} active signals</p>
				</div>

				<div class="flex flex-col">
					{#each activeLeads as lead (lead.id)}
						<button
							type="button"
							aria-label={`Select ${lead.name}`}
							onclick={() => (selectedLead = lead)}
							class={`group w-full text-left transition ${
								selectedLead.id === lead.id ? 'rounded-[1.35rem] bg-[#1b2638]' : ''
							}`}
						>
							{#if lead.id === activeLeads[0].id}
								<div
									class="rounded-[1.35rem] border border-[var(--ff-cyan)] p-6 shadow-[0_0_0_1px_rgba(56,213,255,0.35),0_0_48px_rgba(56,213,255,0.12)]"
								>
									<div class="mb-5 flex items-center justify-between gap-4">
										<p
											class="rounded-full border border-[var(--ff-cyan)]/40 bg-[var(--ff-cyan)]/10 px-3 py-1 text-xs font-medium text-[var(--ff-cyan)]"
										>
											Recommended first action
										</p>

										<p class="text-sm text-[var(--ff-text-muted)]">
											${lead.estimatedValue.toLocaleString()} at risk
										</p>
									</div>

									<div class="flex items-stretch gap-5">
										<div
											class="w-1.5 shrink-0 rounded-full"
											style={`background: ${getSignalColor(lead.urgencyScore)}`}
										></div>

										<div class="min-w-0 flex-1">
											<h3 class="text-3xl font-semibold tracking-tight">{lead.name}</h3>

											<p class="mt-2 text-sm text-[var(--ff-text-muted)]">
												{lead.business} · {lead.interest}
											</p>

											<p class="mt-5 max-w-2xl text-base leading-7 text-[var(--ff-text)]">
												{lead.recommendedNextStep}
											</p>

											<div class="mt-6">
												<div class="mb-2 flex items-center justify-between text-xs">
													<span class="text-[var(--ff-text-muted)]">
														{getActionLabel(lead.urgencyScore)}
													</span>
													<span class="text-[var(--ff-cyan)]">Window is active</span>
												</div>

												<div class="h-1.5 overflow-hidden rounded-full bg-[#0b111c]">
													<div
														class="h-full rounded-full"
														style={`width: ${getMomentumWidth(lead.urgencyScore)}; background: ${getSignalColor(lead.urgencyScore)}`}
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							{:else}
								<div
									class={`border-b border-[var(--ff-border)] px-2 py-5 transition hover:bg-[var(--ff-surface-elevated)]/45 ${
										selectedLead.id === lead.id ? 'rounded-2xl px-5' : ''
									}`}
								>
									<div class="flex items-center justify-between gap-6">
										<div class="flex min-w-0 items-center gap-4">
											<div
												class="h-10 w-1 shrink-0 rounded-full"
												style={`background: ${getSignalColor(lead.urgencyScore)}`}
											></div>

											<div class="min-w-0">
												<h3 class="truncate text-lg font-semibold">{lead.name}</h3>
												<p class="mt-1 truncate text-sm text-[var(--ff-text-muted)]">
													{lead.recommendedNextStep}
												</p>
											</div>
										</div>

										<div class="shrink-0 text-right">
											<p class="text-xs text-[var(--ff-text-muted)]">
												{getActionLabel(lead.urgencyScore)}
											</p>
											<p class="mt-1 font-semibold">${lead.estimatedValue.toLocaleString()}</p>
										</div>
									</div>
								</div>
							{/if}
						</button>
					{/each}
				</div>
			</section>
		</section>

		<aside class="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
			<section
				class="rounded-[2rem] bg-[var(--ff-surface)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
			>
				<p class="text-sm font-medium text-[var(--ff-cyan)]">Why this lead is first</p>

				<h2 class="mt-4 text-3xl font-semibold tracking-tight">{selectedLead.name}</h2>

				<p class="mt-2 text-[var(--ff-text-muted)]">
					FollowFlow ranked this opportunity first because the signal is recent, the value is clear,
					and the next move is obvious.
				</p>

				<div class="mt-6 rounded-3xl bg-[var(--ff-surface-elevated)] p-5">
					<div class="space-y-5">
						<div>
							<p class="text-sm font-semibold text-[var(--ff-text)]">Evidence</p>

							<div class="mt-3 space-y-3 text-sm leading-6 text-[var(--ff-text-muted)]">
								<p>• {selectedLead.lastInteraction}</p>
								<p>• No reply has been sent yet</p>
								<p>• ${selectedLead.estimatedValue.toLocaleString()} opportunity is still active</p>
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
