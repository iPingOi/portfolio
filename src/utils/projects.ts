import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'

/** Note: this function filters out draft posts based on the environment */
export async function getAllProjects() {
	return await getCollection('projects', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true
	})
}

export function sortMDByDateProjects(
	posts: Array<CollectionEntry<'projects'>>,
) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf()
		const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf()
		return bDate - aDate
	})
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllTagsProjects(posts: Array<CollectionEntry<'projects'>>) {
	return posts.flatMap((post) => [...post.data.tags])
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsProjects(
	posts: Array<CollectionEntry<'projects'>>,
) {
	return [...new Set(getAllTagsProjects(posts))]
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsWithCountProjects(
	posts: Array<CollectionEntry<'projects'>>,
): Array<[string, number]> {
	return [
		...getAllTagsProjects(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1])
}
