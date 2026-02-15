import { AlignVerticalJustifyCenterIcon, Code2, FileText, Heading, Heading1, Heading2, List } from "lucide-react";

export const SIDEBAR_SECTIONS = [
    {
        title: 'Headings',
        blocks: [
            { type: 'heading', label: 'Heading', Icon: Heading },
            { type: 'heading1', label: 'Heading 1', Icon: Heading1 },
            { type: 'heading2', label: 'Heading 2', Icon: Heading2 },
        ] 
    },
    {
        title: 'Content',
        blocks: [
            { type: 'paragraph', label: 'Paragraph', Icon: FileText },
        ] 
    },
    {
        title: 'Lists',
        blocks: [
            { type: 'bullet', label: 'Bullet Points', Icon: List },
        ] 
    },
    {
        title: 'Code',
        blocks: [
            { type: 'code', label: 'Code Block', Icon: Code2 },
        ] 
    },
    {
        title: 'Divider',
        blocks: [
            { type: 'divider', label: 'Divider', Icon: AlignVerticalJustifyCenterIcon }
        ]
    }
]