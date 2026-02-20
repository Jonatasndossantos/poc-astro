import { t, type Dictionary } from 'intlayer';
import fs from 'node:fs';
import path from 'node:path';

// Helper to read local file
const getLocalMarkdown = (relativePath: string) => {
    try {
        const filePath = path.resolve(process.cwd(), relativePath);
        return fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
        return `Error reading file: ${relativePath}`;
    }
};

const projectsContent = {
    key: 'projects-content',
    content: {
        // Demonstration: Using the project's own README.md
        testProject: t({
            en: getLocalMarkdown('README.md'),
            pt: 'Este conteúdo será gerado automaticamente pela IA com base no README em inglês.',
        }),
    },
} satisfies Dictionary;

export default projectsContent;
