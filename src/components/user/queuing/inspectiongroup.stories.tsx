import type { Meta, StoryObj } from "@storybook/react";

import InspectionGroup from "./inspectiongroup"
import { Accordion } from "@/components/ui/accordion";

const meta = {
    title: "User/InspectionGroup",
    component: InspectionGroup,
    decorators: [
        (Story: any) => (
            <Accordion type="multiple">
                <Story />
            </Accordion>
        )
    ]
} satisfies Meta<typeof InspectionGroup>

export default meta;
type Story = StoryObj<typeof meta>;

export const NotCheckedIn: Story = {
    args: {
        groupName: "Not Checked In",
        teams: ["127C", "8800"]
    }
}

export const NotStarted: Story = {
    args: {
        groupName: "Not Started",
        teams: ["127C", "8800"]
    }
}

export const InspectionInProgress: Story = {
    args: {
        groupName: "In Progress",
        teams: ["127C", "8800"]
    }
}

export const InspectionComplete: Story = {
    args: {
        groupName: "Complete",
        teams: ["127C", "8800"]
    }
}