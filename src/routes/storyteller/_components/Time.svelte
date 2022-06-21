<script>
    import dayjs from "dayjs";
    import AdvancedFormat from "dayjs/plugin/advancedFormat.js";
    dayjs.extend(AdvancedFormat);

    const time = dayjs().format("Do MMM YYYY");

</script>
<span class="text-xs font-bold text-accent uppercase">
    {time}
</span>