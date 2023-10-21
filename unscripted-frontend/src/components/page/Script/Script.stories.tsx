import { ComponentStory, ComponentMeta } from "@storybook/react"

import { ScriptPageView } from "./View"

export default {
  title: "Page/Script",
  component: ScriptPageView,
} as ComponentMeta<typeof ScriptPageView>;

const Template: ComponentStory<typeof ScriptPageView> = (args) => (
  <ScriptPageView {...args} />
)

export const Default = Template.bind({})
Default.args = {}