<script>
    import dayjs from "dayjs";
    import AdvancedFormat from "dayjs/plugin/advancedFormat.js";
    dayjs.extend(AdvancedFormat);

    export let currTime
    const time = dayjs(currTime).format("h:mmA Do MMM YYYY");
</script>
<span class="text-xs italic font-light">
    {time}
</span>