const currentDateUTC = new Date().toUTCString()

module.exports = {
	title: 'Civil California',
	dest: './public',
	themeConfig: {
		// repo: 'https://github.com/kfung21/CivilCalifornia.git',
		// repoLabel: 'Repo',
		// editLinks: true,
		// editLinkText: 'Found a bug? Help me improve this page!',
		activeHeaderLinks: true,
		search: true,
    	searchMaxSuggestions: 10,
		sidebar: 'auto',
		nav: [
			{ text: 'Blog', link: '/blog/', items: [
				{text: 'Blog', link: '/blog/'},
				{text: 'Tags', link: '/tags/'},
				{text: 'Archive', link: '/archive/'},
			]},
			{ text: 'Projects', link: '/projects/' },
			{ text: 'Civil Engineering 101', link: '/civileng101/', items: [
			{text: 'Disciplines', link: '/civileng101/disciplines', items: [
				{text: 'Transportation', link: '/civileng101/transportation'},
				{text: 'Water and Environmental', link: '/civileng101/Water-Environmental'},
				{text: 'Geotechnical', link: '/civileng101/geotechnical'},
				{text: 'Structures', link: '/civileng101/structures'},
			]},
			{text: 'Fields', link: '/civileng101/fields', items: [
				{text: 'Planning', link: '/civileng101/planning'},
				{text: 'Design', link: '/civileng101/design'},
				{text: 'Construction', link: '/civileng101/construction'},
				{text: 'Operations', link: '/civileng101/operations'},
			]},
			] },
			{ text: 'Job Sectors', link: '/JobSectors/', items: [
			{text: 'Public', link: '/JobSectors/Public', items: [
				{text: 'Cities', link: '/JobSectors/cities'},
				{text: 'Counties', link: '/JobSectors/counties'},
				{text: 'State', link: '/JobSectors/state'},
				{text: 'Federal', link: '/JobSectors/federal'},
				{text: 'Utilities', link: '/JobSectors/utilities'},
				{text: 'Regional', link: '/JobSectors/regional'},
			]},
			{text: 'Private', link: '/JobSectors/private', items: [
				{text: 'Small', link: '/JobSectors/small'},
				{text: 'Large', link: '/JobSectors/large'},
			]},
			]},
			{ text: 'Career Resources', link: '/CareerResources/', items: [
			{text: 'License: EIT(FE)/PE', link: '/CareerResources/license'},
			{text: 'UC/CSU Civil Engineering Programs', link: '/CareerResources/colleges'},
			{text: 'Professional Organizations', link: '/CareerResources/proforg'},
			{text: 'Misc. Links and Resources', link: '/CareerResources/misclinks'},
			]},
			{ text: 'About', link: '/about' },
      
		],
		logo: 'https://drive.google.com/uc?export=view&id=1J0_j_Dng6E-3PQNP_xFM_AEd8YGoFyz3',
		docsDir: 'src',
		pageSize: 5,
		startPage: 0
	},
	plugins: [
		[
			'@vuepress/google-analytics',
			{
				ga: 'UA-165628907-1' // UA-00000000-0
			}
		],
		[
			'vuepress-plugin-rss',
			{
				base_url: '/',
				site_url: 'https://vuepressblog.org',
				filter: frontmatter => frontmatter.date <= new Date(currentDateUTC),
				count: 20
			}
		],
		'vuepress-plugin-reading-time',
		'vuepress-plugin-janitor',
		'@vssue/vuepress-plugin-vssue',{
			// set `platform` rather than `api`
			platform: 'github',
	  
			// all other options of Vssue are allowed
			owner: 'Kevin',
			repo: 'https://github.com/kfung21/CivilCalifornia.git',
			clientId: 'c5d51bac395f5b91bbcb',
			clientSecret: '6047858a84980eb1bf103fa3330d3121a70d7100',
		},
	],
	head: [
		['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon.png' }],
		['link', { rel: 'icon', sizes: '32x32', href: '/cc_logo.png' }],
		['link', { rel: 'icon', sizes: '16x16', href: '/cc_logo.png' }],
		['link', { rel: 'manifest', href: '/site.webmanifest' }],
		['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
		['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
		['meta', { name: 'theme-color', content: '#ffffff' }]
	]
}
