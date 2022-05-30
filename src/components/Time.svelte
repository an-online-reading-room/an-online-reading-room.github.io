<script>
    import dayjs from "dayjs";
    import AdvancedFormat from "dayjs/plugin/advancedFormat";
    dayjs.extend(AdvancedFormat);

    const time = dayjs().format("Do MMM YYYY");

</script>
<span class="text-xs font-bold text-accent">
    {time}
</span>