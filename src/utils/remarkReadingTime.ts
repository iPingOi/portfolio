// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export function remarkReadingTime() {
	// @ts-expect-error:next-line
	return (tree, { data }) => {
		const textOnPage = toString(tree)
		const readingTime = getReadingTime(textOnPage)
		// readingTime.text will give us minutes read as a friendly string,
		// i.e. "3 min read"
		data.astro.frontmatter.minutesRead = readingTime.text
	}
}
