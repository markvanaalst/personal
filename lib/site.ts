import { typedResumeData } from '@/lib/types';

export const siteUrl = typedResumeData.url;
export const siteTitle = `${typedResumeData.firstName} ${typedResumeData.lastName} | ${typedResumeData.description}`;
export const siteDescription = typedResumeData.summary;

// Shared content column: every page's left edge lines up with this.
export const contentColumn = 'mx-auto w-full max-w-4xl px-6 sm:px-12 lg:px-16';
