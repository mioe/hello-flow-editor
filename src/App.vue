<script setup lang="ts">
import { ref, Ref } from 'vue'
import BaklavaJs from './demos/BaklavaJs/BaklavaJs.vue'
// @ts-ignore
import KonvaJs from './demos/KonvaJs/KonvaJs.vue'

const selected = ref(null)
const nodes = ref(10)
const isRender = ref(false)
const logs: Ref<string[]> = ref([])
</script>

<template>
	<div class="w-full min-h-screen flex">
		<section class="fixed top-[20px] left-[20px] z-9 flex gap-[8px] bg-[#121212] p-[8px] rounded">
			<input
				v-model="nodes"
				type="number"
			>
			<select v-model="selected">
				<option
					:value="null"
					disabled
				>
					NULL
				</option>
				<option
					value="BaklavaJs"
				>
					BaklavaJs
				</option>
				<option
					value="KonvaJs"
				>
					KonvaJs
				</option>
			</select>
			<span>
				isRender: {{ isRender }}
			</span>
			<button @click="isRender = true">
				set true
			</button>
			<button @click="isRender = false">
				set false
			</button>

			<div
				v-if="logs.length"
				class="absolute top-[calc(100%+20px)] left-0 bg-[#121212] p-[8px] rounded text-[10px]"
			>
				<ul class="flex flex-col gap-[8px]">
					<li
						v-for="(l, idx) in logs"
						:key="idx"
						class="inline-flex"
					>
						{{ l }}
					</li>
				</ul>
			</div>
		</section>

		<section class="fixed max-w-[400px] top-[20px] right-[20px] z-9 flex flex-col gap-[8px] bg-[#121212] p-[8px] rounded text-[14px]">
			<p class="inline-flex gap-[4px]">
				<a
					href="https://github.com/newcat/baklavajs"
					target="_blank"
				>https://github.com/newcat/baklavajs</a>
				- MIT
			</p>
			<p class="inline-flex gap-[4px]">
				<a
					href="https://github.com/konvajs/konva"
					target="_blank"
				>https://github.com/konvajs/konva</a>
				- MIT
			</p>
			<br>
			<div class="text-[10px]">
				<p>
					demos:
				</p>
				<div class="flex flex-col">
					<p class="color-yellow-300">
						html + svg
					</p>
					<a
						href="https://www.jointjs.com/demos/chatbot"
						target="_blank"
					>
						https://www.jointjs.com/demos/chatbot
					</a>
					<a
						href="https://codesandbox.io/s/baklavajs-example-jyc6f"
						target="_blank"
					>
						baklavajs demo
					</a>
					<a
						href="https://jerosoler.github.io/Drawflow/"
						target="_blank"
					>
						https://jerosoler.github.io/Drawflow/
					</a>
				</div>
				<div class="pt-[4px] flex flex-col">
					<p class="color-red-300">
						canvas + interactive html
					</p>
					<a
						href="https://tamats.com/projects/litegraph/editor/"
						target="_blank"
					>
						https://tamats.com/projects/litegraph/editor/
					</a>
				</div>
			</div>
		</section>

		<BaklavaJs
			v-if="isRender && selected === 'BaklavaJs'"
			:nodes="nodes"
			@done="logs.push(`BaklavaJs [${nodes} nodes] - ${$event}ms`)"
		/>
		<KonvaJs
			v-if="isRender && selected === 'KonvaJs'"
			:nodes="nodes"
			@done="logs.push(`KonvaJs [${nodes} nodes] - ${$event}ms`)"
		/>
	</div>
</template>
