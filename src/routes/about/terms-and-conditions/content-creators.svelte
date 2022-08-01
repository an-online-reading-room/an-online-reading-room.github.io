<script>
    import MenuItem from "$components/MenuItem.svelte";
    import { goto, afterNavigate } from "$app/navigation";
import { session } from "$app/stores";

    let open = true;
    let back;
    let currSession = $session

    afterNavigate((navigation) => {
        back = currSession.menuBack 
        console.log(back)
    });
</script>

<MenuItem
    name="Terms and Conditions for Content Creators"
    {open}
    openMenu={false}
    inHeader={true}
    on:hide={() => history.back()}
    on:hideMenu={() => goto(back)}>
    <ol class="list-decimal list-inside">
        <li>
            These Terms of Use (“Terms”) contain the legal terms and conditions
            that govern your use of the portions of thereadingroom.online
            (“Site”), which offer the facilities to upload original content
            including but not limited to text, images, videos, 3D models (“User
            Materials”).
        </li>

        <li>
            RIGHT TO REVISE
            <p>
                We may revise these Terms from time to time by posting a revised
                version. YOUR CONTINUED USE OF ANY OF OUR SITE AFTER WE POST ANY
                CHANGES WILL CONSTITUTE YOUR ACCEPTANCE OF SUCH CHANGES. YOU
                ACKNOWLEDGE AND AGREE THAT YOU HAVE READ AND REVIEWED THESE
                TERMS IN THEIR ENTIRETY AND THAT THEY CONSTITUTE BINDING AND
                ENFORCEABLE OBLIGATIONS ON YOU.
            </p>
        </li>

        <li>
            MATERIALS SUBMITTED BY YOU AND USE OF OUR SITE
            <p>
                Any User Materials submitted by you and your use of our Site are
                subject to the following terms and conditions:
            </p>
            <ol>
                <li>
                    You will retain ownership of all User Materials. Although
                    you retain ownership of User Materials, any template or
                    layout in which you arrange or organize User Materials
                    through various tools and features may be modified and
                    utilized by other individuals for any non-commercial
                    purposes.
                </li>
                <li>
                    You represent and warrant that you own or otherwise possess
                    all necessary rights with respect to the User Materials, and
                    that the User Materials do not and will not infringe any
                    copyright, trade secret right or other intellectual property
                    or other property right of any third party, and that the
                    User Materials are not fraudulent, threatening, abusive,
                    libelous, defamatory, obscene, pornographic, indecent, lewd,
                    containing nudity, in violation of privacy rights, obscene
                    or otherwise objectionable or unlawful. We have the sole
                    discretion, but not the obligation, to remove any User
                    Materials that violate these Terms. We shall have no
                    liability to you in the event we undertake such action.
                </li>
                <li>
                    You consent to the use of your likeness, and you have
                    obtained the written consent of every identifiable
                    individual who appears in User Materials to use such
                    individual’s likeness, for purposes of using and otherwise
                    exploiting the User Materials in the manner contemplated by
                    these Terms. You agree, upon our request, to provide us with
                    a copy of the consents from such individuals or from the
                    parent or guardian if any such individual is a minor.
                </li>

                <li>
                    You agree that we may forward User Materials to any third
                    party as required by law, to enforce these Terms or to
                    comply with any legal obligations or governmental requests.
                </li>

                <li>
                    You agree to indemnify and hold us, our directors,
                    shareholders, employees, contractors, agents,
                    representatives and third-party service providers harmless
                    from and against any and all claims, causes of action,
                    liabilities, damages, losses, expenses and costs (including,
                    without limitation, attorneys’ fees) that arise directly or
                    indirectly out of or from your violation of these Terms.
                </li>

                <li>
                    We are not responsible for, and will have no liability for,
                    the loss of any User Materials from our Site.
                </li>

                <li>
                    We have the right, at any time and in our sole discretion,
                    to block links to our Site through technological or other
                    means without prior notice.
                </li>

                <li>
                    We reserve the right to refuse to print any Products that
                    violate Digital Terms or otherwise contain User Materials
                    that we determine, in our sole discretion, are in violation
                    of our company mission.
                </li>
            </ol>
        </li>

        <li>
            PROPRIETARY RIGHTS
            <p>
                You agree to hereby grant us an exclusive, irrevocable,
                perpetual, transferable, with derivative use rights, assignable,
                sub-licensable, royalty-free license to use, sublicense, or
                otherwise make the User Materials available to any parties the
                User Material that is to be published on our Site.
            </p>
            <p>
                We hereby acknowledge that the User Materials are owned by you,
                and except as provided in this Agreement, we have no right of
                ownership to the User Materials. You agree and acknowledge that
                you have granted us a User License and that you may not sell,
                sublicense, or otherwise make the User Materials available to
                any unauthorized party.
            </p>
        </li>
    </ol>
</MenuItem>

<style>
  li {
    padding: 0.5rem 0 0.5rem 0;
  }
</style>