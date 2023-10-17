import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { ProfileDropdown } from "./index"

export default {
  title: "UI/ProfileDropdown",
  component: ProfileDropdown,
} as ComponentMeta<typeof ProfileDropdown>;

const Template: ComponentStory<typeof ProfileDropdown> = (args) => (
  <ProfileDropdown {...args} />
)

export const Default = Template.bind({})
Default.args = {}