<script setup lang="ts">
import type {Answer} from '../constants/types.ts'

defineProps<{ answer: Answer }>()

// --- utils ---
function timeAgo(date: Date) {
  const thenMs = date.getTime();
  const nowMs = Date.now();
  const diffMs = nowMs - thenMs;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximation
  const years = Math.floor(days / 365); // Approximation

  if (seconds < 60) {
    return seconds === 0 ? 'just now' : `${seconds} sec${seconds === 1 ? '' : 's'} ago`;
  } else if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
  } else if (hours < 24) {
    return `${hours} hr${hours === 1 ? '' : 's'} ago`;
  } else if (days < 7) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  } else {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
}
</script>

<template>
  <li>
    <div>
      <small :title="answer.time.toLocaleString()">[{{ timeAgo(answer.time) }}] </small>
      <span class="label">Question: </span>
      {{ answer.question }}
    </div>
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span class="label">Answer: </span>
      <span :class="answer.answer.positivity">{{ answer.answer.value }}</span>
    </div>
  </li>
</template>

<style scoped>
small {
  color: var(--a2-700)
}

small:hover {
  color: var(--a2-600)
}

.label {
  font-weight: bold;
}

.positive {
  color: var(--a3-500);
}

.neutral {
  color: var(--a2-700);
}

.negative {
  color: var(--w-900);
}
</style>