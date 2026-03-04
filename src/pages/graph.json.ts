import { getCollection } from "astro:content";

export async function GET({ request }) {
    // 1. Fetch all collections
    const projects = await getCollection("projects");
    const blogs = await getCollection("blog");
    const services = await getCollection("services");
    const topics = await getCollection("topics");
    const tags = await getCollection("tags");

    const nodes = [];
    const links = [];

    // 1. Helpers
    const addNode = (id: string, group: string, label: string, iconUrl?: string, hasRoute = false) => {
        if (!nodes.find((n: any) => n.id === id)) {
            nodes.push({ id, group, label, icon: iconUrl, hasRoute });
        }
    };

    const addLink = (source: string, target: string) => {
        if (!links.find((l: any) => l.source === source && l.target === target)) {
            links.push({ source, target });
        }
    };

    // Helper: Strip extension
    const cleanId = (id: string) => id.replace(/\.mdx?$/, "");

    // Helper: Resolve SVG Icon CDN
    const getIconInfo = (icon?: string) => icon ? `https://cdn.simpleicons.org/${icon}/ffffff` : undefined;

    // 2. Map Taxonomy Nodes (hasRoute = false until pages are built)
    topics.forEach(t => addNode(`topics/${cleanId(t.id)}`, "topics", t.data.title, getIconInfo(t.data.icon), false));
    tags.forEach(t => addNode(`tags/${cleanId(t.id)}`, "tags", t.data.title, getIconInfo(t.data.icon), false));

    // 3. Map Projects (hasRoute = true)
    projects.forEach(p => {
        const pId = `projects/${cleanId(p.id)}`;
        addNode(pId, "projects", p.data.title, undefined, true);

        p.data.relatedTopics?.forEach(ref => addLink(pId, `topics/${cleanId(ref.id || ref)}`));
        p.data.tags?.forEach(ref => addLink(pId, `tags/${cleanId(ref.id || ref)}`));
        p.data.relatedServices?.forEach(ref => addLink(pId, `services/${cleanId(ref.id || ref)}`));
        p.data.relatedPosts?.forEach(ref => addLink(pId, `blog/${cleanId(ref.id || ref)}`));
    });

    // 4. Map Blog Posts (hasRoute = true)
    blogs.forEach(b => {
        const bId = `blog/${cleanId(b.id)}`;
        addNode(bId, "blog", b.data.title, undefined, true);

        b.data.relatedTopics?.forEach(ref => addLink(bId, `topics/${cleanId(ref.id || ref)}`));
        b.data.tags?.forEach(ref => addLink(bId, `tags/${cleanId(ref.id || ref)}`));
        if (b.data.relatedProject) addLink(bId, `projects/${cleanId(b.data.relatedProject.id || b.data.relatedProject)}`);
        if (b.data.ctaService) addLink(bId, `services/${cleanId(b.data.ctaService.id || b.data.ctaService)}`);
    });

    // 5. Map Services (hasRoute = true)
    services.forEach(s => {
        const sId = `services/${cleanId(s.id)}`;
        addNode(sId, "services", s.data.title, undefined, true);
        s.data.relatedTopics?.forEach(ref => addLink(sId, `topics/${cleanId(ref.id || ref)}`));
    });

    // Calculate Weights (number of edges pointing to/from)
    nodes.forEach(n => {
        n.weight = links.filter(l => l.source === n.id || l.target === n.id).length;
    });

    // Ensure all targets inside links exist as nodes (fallback for dead links, avoiding D3/Cytoscape crashes)
    links.forEach(l => {
        if (!nodes.find(n => n.id === l.target)) {
            addNode(l.target, "unknown", l.target.split('/').pop());
        }
    });

    return new Response(JSON.stringify({ nodes, links }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
