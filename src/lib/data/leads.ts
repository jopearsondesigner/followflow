/* src/lib/data/leads.ts */
import type { Lead } from '$lib/types/lead';

export const leads: Lead[] = [
	{
		id: 'sarah-mitchell',
		name: 'Sarah Mitchell',
		business: 'Bloom & Branch Floral Studio',
		interest: 'Monthly website care plan',
		lastInteraction: 'Asked about timeline yesterday',
		temperature: 'Hot',
		estimatedValue: 2400,
		urgencyScore: 96,
		recommendedNextStep: 'Follow up first — she asked about availability and is close to booking.',
		aiInsight:
			'High priority because Sarah asked about timeline yesterday and has not received a reply.',
		suggestedReplies: {
			Friendly: [
				'Hi Sarah — thanks again for reaching out. I’d be happy to help with the monthly website care plan. I have availability this week if you’d like to talk through the next steps.',
				'Hi Sarah — I’ve been thinking about your site and I think the care plan could be a great fit. Would you like me to send over a simple next-step outline?'
			],
			Concise: [
				'Hi Sarah — I have availability this week for the website care plan. Would you like me to send over next steps?',
				'Hi Sarah — yes, I can help with this. Want me to send a quick outline for getting started?'
			],
			'Urgency-Aware': [
				'Hi Sarah — I wanted to follow up while your timeline is still fresh. I have a couple of openings this week if you’d like to move forward.',
				'Hi Sarah — since you mentioned timeline, I wanted to check in before my week fills up. Would you like me to send next steps today?'
			]
		},
		followedUp: false
	},
	{
		id: 'marcus-reed',
		name: 'Marcus Reed',
		business: 'Peak Home Services',
		interest: 'Lead follow-up automation',
		lastInteraction: 'Requested pricing 3 days ago',
		temperature: 'Warm',
		estimatedValue: 3600,
		urgencyScore: 82,
		recommendedNextStep: 'Send a clear pricing follow-up with one low-friction call option.',
		aiInsight:
			'Warm lead with buying intent. Pricing was requested, but delay could reduce momentum.',
		suggestedReplies: {
			Friendly: [
				'Hi Marcus — I wanted to follow up with a simple pricing overview and see if it would help to talk through what would fit your team best.',
				'Hi Marcus — thanks again for asking about pricing. I can send a straightforward option and we can adjust from there if needed.'
			],
			Concise: [
				'Hi Marcus — following up on pricing. Would you like the simple starter option or a more detailed breakdown?',
				'Hi Marcus — I can send pricing today. Want the quick version first?'
			],
			'Urgency-Aware': [
				'Hi Marcus — I wanted to follow up before this gets buried. I can send pricing today and help you decide if it’s worth a quick call.',
				'Hi Marcus — since you asked about pricing a few days ago, I wanted to keep this moving while it’s still fresh.'
			]
		},
		followedUp: false
	},
	{
		id: 'elena-torres',
		name: 'Elena Torres',
		business: 'North Star Coaching',
		interest: 'Landing page redesign',
		lastInteraction: 'Said she would circle back last week',
		temperature: 'Cooling',
		estimatedValue: 1400,
		urgencyScore: 68,
		recommendedNextStep: 'Re-engage with a helpful, no-pressure message.',
		aiInsight:
			'This opportunity is cooling because the last response was noncommittal and a week has passed.',
		suggestedReplies: {
			Friendly: [
				'Hi Elena — just wanted to check back in. No pressure at all, but I’d still be happy to help with the landing page when the timing feels right.',
				'Hi Elena — hope your week is going well. I wanted to gently follow up on the landing page redesign and see if it’s still on your radar.'
			],
			Concise: [
				'Hi Elena — checking in on the landing page redesign. Is this still something you’re considering?',
				'Hi Elena — should I keep this on my radar, or would a later check-in be better?'
			],
			'Urgency-Aware': [
				'Hi Elena — I wanted to follow up before too much time passes. If the landing page is still a priority, I can help you map out a simple next step.',
				'Hi Elena — since last week got busy, I wanted to reconnect while the redesign is still fresh.'
			]
		},
		followedUp: false
	},
	{
		id: 'dana-kim',
		name: 'Dana Kim',
		business: 'Kindred Massage & Wellness',
		interest: 'Booking page optimization',
		lastInteraction: 'Opened proposal 12 days ago',
		temperature: 'Dormant',
		estimatedValue: 900,
		urgencyScore: 44,
		recommendedNextStep: 'Send a soft reactivation message focused on reducing friction.',
		aiInsight:
			'Proposal activity shows some interest, but the long delay means this should be handled gently.',
		suggestedReplies: {
			Friendly: [
				'Hi Dana — I noticed this may have slipped down the list, so I wanted to check in gently. I’d still be happy to help improve the booking page when the timing is right.',
				'Hi Dana — hope things are going well at Kindred. Just checking whether the booking page optimization is still something you’d like help with.'
			],
			Concise: [
				'Hi Dana — checking in. Is the booking page project still active, or should I follow up later?',
				'Hi Dana — should I keep the booking page optimization on my radar?'
			],
			'Urgency-Aware': [
				'Hi Dana — I wanted to follow up before this goes fully cold. If improving bookings is still a priority, I can suggest a simple next step.',
				'Hi Dana — since the proposal has been sitting for a bit, I wanted to make it easy to restart if the timing still works.'
			]
		},
		followedUp: false
	}
];
