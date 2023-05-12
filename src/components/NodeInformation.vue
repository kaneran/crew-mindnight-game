<script lang="ts">
import { PropType, defineComponent } from 'vue';
import Outcome from '@/types/Outcome';
import ParticipantList from './ParticipantList.vue';
import GameSetup from '@/types/GameSetup';

export default defineComponent({
    props: {
        outcome: {} as PropType<Outcome>,
        gameSetup: {} as PropType<GameSetup>
    },
    components: {
        ParticipantList
    }
})
</script>

<template>
    <div v-if="outcome?.participants?.length > 0">
    <div v-if="outcome?.result === 'Hacked'">
        <p>NODE COMPROMISED</p>
        <ParticipantList :participants="gameSetup?.players?.filter(player => outcome?.participants.filter(participant => participant === player.name).length > 0)" :reduceFontSize="true"/>
        <p>{{ outcome?.numberOfHackersDetected }} hacker{{ outcome?.numberOfHackersDetected == 2 ? 's' : '' }} detected</p>
    </div>
    <div v-else>
        <p>NODE SECURED</p>
        <ParticipantList :participants="gameSetup?.players?.filter(player => outcome?.participants.filter(participant => participant === player.name).length > 0)" :reduceFontSize="true"/>
        <p>No hackers detected</p>
    </div>
</div>
<div v-else>
    No maintenance done on this node yet!
</div>
</template>
