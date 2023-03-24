<script setup lang="ts">
import {
	EditorComponent,
	useBaklava,
	DependencyEngine,
	applyResult,
} from 'baklavajs'
import '@baklavajs/themes/dist/syrup-dark.css'

import { DisplayNode } from './DisplayNode'
import { MathNode } from './MathNode'

const props = defineProps({
	nodes: {
		type: Number,
		default: 10,
	},
})

const baklava = useBaklava()
const engine = new DependencyEngine(baklava.editor)

baklava.editor.registerNodeType(MathNode)
baklava.editor.registerNodeType(DisplayNode)

const token = Symbol()
engine.events.afterRun.subscribe(token, (result) => {
	engine.pause()
	applyResult(result, baklava.editor)
	engine.resume()
})

engine.start()

// Add some nodes for demo purposes
function addNodeWithCoordinates(nodeType: any, x: any, y: any) {
	const n = new nodeType()
	baklava.displayedGraph.addNode(n)
	n.position.x = x
	n.position.y = y
	return n
}
const s = Date.now()
console.log('🦕 START', s)
for (let i = 0; i < props.nodes; i++) {
	const NODE1_X = 300 * (i + 1)
	const NODE1_Y = 140 * i
	const NODE2_X = 550 * (i + 1)
	const NODE2_Y = 140 * i

	const node1 = addNodeWithCoordinates(MathNode, NODE1_X, NODE1_Y)
	const node2 = addNodeWithCoordinates(DisplayNode, NODE2_X, NODE2_Y)
	baklava.displayedGraph.addConnection(
		node1.outputs.result,
		node2.inputs.value,
	)
}

const emit = defineEmits([
	'done',
])

const e = Date.now() - s
console.log('🦕 END (between)', e)
emit('done', e)
</script>

<template>
	<section class="w-full h-scrren">
		<EditorComponent :view-model="baklava" />
	</section>
</template>
