export type LeadTemperature = 'Hot' | 'Warm' | 'Cooling' | 'Dormant';

export type ReplyTone = 'Friendly' | 'Concise' | 'Urgency-Aware';

export type Lead = {
	id: string;
	name: string;
	business: string;
	interest: string;
	lastInteraction: string;
	temperature: LeadTemperature;
	estimatedValue: number;
	urgencyScore: number;
	recommendedNextStep: string;
	aiInsight: string;
	suggestedReplies: Record<ReplyTone, string[]>;
	followedUp: boolean;
};
