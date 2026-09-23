<script setup lang="ts">
import { getBoardMember } from '~/utils/boardData'

const route = useRoute()
const slug = route.params.slug as string
const member = getBoardMember(slug)

if (!member) {
  throw createError({ statusCode: 404, statusMessage: 'پروفایل مدیر یافت نشد' })
}

useSeoMeta({
  title: `${member.name} — ثاخت`,
  description: member.role,
})
</script>

<template>
  <BaseContainer>
    <BoardMemberProfile :member="member" />
  </BaseContainer>
</template>
