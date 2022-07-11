<script>
import { version } from '$stores/version'
import { theme } from '$stores/theme'
import { mode } from '$stores/mode'
import { onDestroy } from 'svelte';
import MenuItem from '$components/MenuItem.svelte';
import { goto } from '$app/navigation';
import CloseIcon from '$components/icons/CloseIcon.svelte'
import HomeIcon from '$components/icons/HomeIcon.svelte'
import ThemeSwitcherIcon from './icons/ThemeSwitcherIcon.svelte';
import MapIcon from './icons/MapIcon.svelte';
import MenuIcon from './icons/MenuIcon.svelte';
import { page } from '$app/stores'
import user from '$stores/user';
import Modal from './Modal.svelte';

  let openMenu = false
  let openAboutMenu = false
  let openFAQMenu = false
  let openTermsMenu = false
  let openWorldbuildersMenu = false
  let openMap = $page.url.pathname === '/lite/map'
  let pathPrefix
  let loginModal = false

  const versionUnsubscribe = version.subscribe(value => {
    pathPrefix = value === 'lite' ? '/adventure/read' : '/'
  })

  const changeTheme = () => {
    const themes = ['cream', 'green', 'red', 'teal', 'grey'].filter(value => value != $theme)
    const newTheme = themes[Math.floor(Math.random()*themes.length)]
    theme.set(newTheme)
  }

  const viewMap = () => {
    if($user.jwt) {
      if($page.url.pathname !== '/lite/map') {
        // toggle
        openMap = !openMap
      } 
      if(openMap === true) goto('/lite/map')
    }
    else {
      loginModal = true
    }
  }

  onDestroy(() => versionUnsubscribe)
</script>

<header>
  <div>
    <div class="flex-initial flex flex-row justify-between gap-x-2
                pt-6 pb-4 px-6">

      <!-- menu card start -->
      {#if openMenu}
      <div class="absolute inset-0 w-screen h-full
                  bg-menu-primary text-menu-accent
                  pt-6 px-6 z-40">

        <div class="flex flex-row justify-end gap-x-2">
          
          <button class="w-10 h-10 focus:outline-none stroke-menu-accent"
                  on:click={() => openMenu = !openMenu}>
            <CloseIcon />
          </button>
        </div>


        <div class="flex flex-col justify-center
                    h-3/4
                    divide-y divide-current
                    text-display text-base text-center">
          <a href="{pathPrefix === '/' ? '/adventure/read' : '/'}" on:click={() => {
            openMenu = !openMenu; 
          }}>
            <div class="w-full h-16 pb-6 pt-4">
              <div class="w-10 h-10 mx-auto stroke-menu-accent">
                <HomeIcon />
              </div>
            </div>
          </a>

          <nav class="flex flex-col divide-y divide-current">
            <div class="cursor-pointer text-center w-full py-4" on:click={() => openAboutMenu = !openAboutMenu}>
              About
            </div>
            <div class="cursor-pointer text-center w-full py-4" on:click={() => openFAQMenu = !openFAQMenu}>
              FAQ
            </div>
            <a class="cursor-pointer text-center w-full py-4" on:click={() => openMenu = false} href="/lite">
              Lite Version
            </a>
            <a class="cursor-pointer text-center w-full py-4" on:click={() => openMenu = false} href="/adventure/read">
              Adventure Version
            </a>           
            <a class="cursor-pointer text-center w-full py-4" on:click={() => openMenu = false} href="/storyteller">
              Storyteller
            </a>  
            <a class="cursor-pointer text-center w-full py-4" on:click={() => openMenu = false} href="/">
              Reading List
            </a>
          </nav>

          
          
          <div class="w-full h-16 pb-6 pt-4">
            <button class="w-10 h-10 mx-auto stroke-menu-accent" on:click={changeTheme}>
              <ThemeSwitcherIcon />
            </button>
          </div>
        </div>

        <!-- About Menu Card Start  -->
        {#if openAboutMenu}
        <MenuItem name="About" open={openAboutMenu} {openMenu}
        on:hide={() => openAboutMenu = !openAboutMenu}
        on:hideMenu={() => openMenu = !openMenu}
        >
          <p>The Reading Room is a collaborative placemaking and location-based project that is being developed by contributors from across the world. We hope  you find meaningful connections through these stories. We hope your time is filled with joy and curiosity as you go through the room. You can view these stories using our lite version, web version, or AR version.</p>
          <p class="text-xxs">◆</p>
          <div>
              <h2 class="font-bold text-lg">Lite Version</h2>
              <p>This version ensures you can smoothly view stories on a low-bandwidth. Unfortunately, some stories may not be accessible or will take a few minutes to load based on your internet speed.</p>
          </div>
          <p class="text-xxs">◆</p>
          <div>
              <h2 class="font-bold text-lg">Adventure Version</h2>
              <p>This version is a Choose Your Own Adventure experience where you choose which stories or streets you’d like to walk down in order to read more stories. To navigate smoothly, please check our <a href="/" class="underline font-bold">infographic</a>.</p>
          </div>
          <p class="text-xxs">◆</p>
          <div>
              <h2 class="font-bold text-lg">AR Version</h2>
              <p>This version is best experienced while walking around your neighbourhood. It is an augmented reality application that allows you to view stories through your phone screen. These stories can be played at physical locations in your neighbourhood.</p>
          </div>
          <p class="text-xxs">◆</p>
          <p>While The Reading Room promotes outdoor interaction, please be aware that with the ongoing pandemic everyone must be careful while doing so or use our web version.</p>
          <section class="cursor-pointer" on:click={() => openWorldbuildersMenu = true}>
            <p class="font-text underline">Worldbuilders</p>
          </section>
          <section class="cursor-pointer" on:click={() => openTermsMenu = true}>
            <p class="font-text underline">Terms and Conditions</p>
          </section>
        </MenuItem>
        {/if}
        <!-- About Menu Card End -->

        <!-- FAQ Menu Card Start -->
        {#if openFAQMenu}   
        <MenuItem name="FAQ" open={openFAQMenu} {openMenu} 
        on:hide={() => openFAQMenu = !openFAQMenu}
        on:hideMenu={() => openMenu = !openMenu}
        >
          <section>
            <h2 class="font-bold text-base">How can I be a part of The Reading Room?</h2>
            <p>We welcome all to contribute as storytellers. We look specifically for stories that are rooted in a place. Every story is important as they add on to how your neighbourhood is seen and experienced by others. It is important to remember to be kind and responsible while sharing, and receive permission if sharing stories that are not your own. If you aren’t sure of what to say, here are our <a href="/prompts" class="underline">prompts</a> to get you started.</p>
          </section>
          <p class="text-xxs">◆</p>
          <section>
            <h2 class="font-bold text-base">What is a Choose Your Own Adventure experience?</h2>
            <p>As a listener, we have recreated the experience of navigating a new neighbourhood yourself. After you view a story, you can choose any hyperlink to read a new story. Thereafter, each story leads to a new set of stories. You know what they say, if you don't know where you're going, any road will get you there. Here is an <a href="/" class="underline font-bold">infographic</a> on how to use it.</p>
          </section>
          <p class="text-xxs">◆</p>
          <section>
            <h2 class="font-bold text-base">How do I create hyperlinks?</h2>
            <p>On highlighting text, you can look for an existing story to hyperlink the same text. Please choose your hyperlinked text with care so other listeners can </p>
          </section>
          <p class="text-xxs">◆</p>
          <section>
            <h2 class="font-bold text-base">How do I upload stories?</h2>
            Our <a href="/" class="underline">story form</a> will ask you to share a story title, summary, username(s), and location, along with your story. Please email us at anonlinereadingroom@gmail.com if you have any trouble.
          </section>
          <p class="text-xxs">◆</p>
          <section>
            <h2 class="font-bold text-base">Can I share these stories?</h2>
            <p>Yes, please do! We hope sharing will gather more storytellers to share with us. Please ensure you credit the authors appropriately. Go through our terms and conditions for a further grasp on what can be shared. </p>
          </section>
          <p class="text-xxs">◆</p>
          <section>
            <h2 class="font-bold text-base">How do I use the AR version?</h2>
            <p>We are currently developing our AR version. We’ll let you know when we’re ready on our instagram page! Follow us for more updates. <a href="https://www.instagram.com/thereadingroom.online/" class="underline font-bold">@thereadingroom.online</a></p>
            <p>Our AR version is available only on mobile devices with internet connections. </p>
          </section>
          <p class="text-xxs">◆</p>
          <section>
            <h2 class="font-bold text-base">How can I support The Reading Room?</h2>
            <p>We are dependent on grants and crowdfunding for support. Please email us at <a href="mailto:anonlinereadingroom@gmail.com">anonlinereadingroom@gmail.com</a> if you would like to become a patron.</p>
          </section>
        </MenuItem>
            
        {/if}
        <!-- FAQ Menu Card End -->

        <!-- Worldbuilders Menu Card Start -->
        {#if openWorldbuildersMenu}
        <MenuItem name="Worldbuilders" open={openWorldbuildersMenu} {openMenu}
        on:hide={() => openWorldbuildersMenu = !openWorldbuildersMenu}
        on:hideMenu={() => openMenu = !openMenu}
        >
          <section>
            <p>The Reading Room is a team of diverse individuals who can’t wait to deep dive into your stories.</p>
          </section>
          <section>
            <p>You can contact us at 
              <a href="mailto:anonlinereadingroom@gmail.com" class="font-bold">anonlinereadingroom@gmail.com</a>
            </p>
          </section>
          <section>
            <h2 class="font-bold text-lg">Core Team</h2>
            <ul>
              <li>Neeti Sivakumar</li>
              <li>Anushka Trivedi</li>
              <li>George Panicker</li>
              <li>Ishwari Arambam</li>
              <li>Shreya Pidikiti</li>
              <li>Oshin Padhye</li>
              <li>Himanshu Erande</li>
            </ul>
          </section>
          <section class="flex flex-col gap-y-3">
            <h2 class="font-bold text-lg">Grants</h2>
            <a target="_blank" href="https://www.goethe.de/ins/in/en/sta/mum/ueb/c3.html">
              <img src="/img/menu/C3.png" alt="C3 : Codes, Creativity, Communities">
            </a>
          </section>
          <section class="flex flex-col gap-y-3">
            <h2 class="font-bold text-lg">Supported by</h2>
            <ul class="flex flex-col gap-y-4">
              <li>
                <a target="_blank" href="https://www.goethe.de/ins/in/en/index.html">
                  <img src="/img/menu/Goethe.png" alt="C3: Codes, Creativity, Communities is a year-long program with participants from the fields of culture and  technology expanding their imagination and creativity through collaborative engagements, toward cultural production and civil society concerns within the realm of open source.">
                </a>
              </li>
              <li>
                <a target="_blank" href="https://befantastic.in/">
                  <img src="/img/menu/BeFantastic.png" alt="BeFantastic is a techart platform that originated in Bangalore, India in 2017. It envisions a positive, sustainable future leveraging creative tech.">
                </a>
              </li>
              <li>
                <a href="https://zkm.de/en">
                  <img src="/img/menu/ZKM.png" alt="The ZKM | Center for Art and Media Karlsruhe is a unique cultural institution worldwide, because it is a place that expands the original tasks of the museum.">
                </a>
              </li>
            </ul>
          </section>
        </MenuItem>
        {/if}
        <!-- Worldbuilders Menu Card End -->

        <!-- Terms Menu Card Start -->
        {#if openTermsMenu}
        <MenuItem name="Terms and Conditions" open={openTermsMenu} {openMenu}
        on:hide={() => openTermsMenu = !openTermsMenu}
        on:hideMenu={() => openMenu = !openMenu}
        >
          <section class="flex flex-col gap-y-2">
            <p>This Terms of Use govern your use of the website, materials, content and the services offered through thereadingroom.online (“Site”).  For the purpose of these Terms of Use, wherever the context so require ‘you’ or “your” or “user” shall mean any natural or legal person who has agreed to become a user of the Site by using the Site as a registered user or browses the Site. Your access or use of the Site is subject to the terms and conditions of use as set out here (“Terms of Use”).</p>
            <p>Please note that by accessing or using the Site you agree to be bound by the Terms of Use and the Terms of Use is a legally binding agreement between you and us, The Reading Room, the owner of the Site (“Company”). The Company may modify all or any part of these Terms of Use from time to time and may not provide notice to You. You are encouraged to check back often so You are aware of your current rights and responsibilities. Your continued use of this Website after changes to the Terms of Use have been published constitutes your binding acceptance of the updated Terms of Use. If at any time the Terms of Use are no longer acceptable to You, You should immediately cease all use of this Website.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Use of the Site</h1>
            <p>All materials provided on this site, including but not limited to all information, materials, functions text, logos, designs, graphics, images, sounds, software, documents, products and services (collectively, the "Materials"), and the selection, arrangement and display thereof, are the copyrighted works of the Company’s vendors or suppliers. All Materials herein are proprietary to the Company’s suppliers and vendors and all Company software are proprietary to Company and protected by worldwide copyright and other intellectual property laws. Except as stated herein, none of the Materials may be modified, copied, reproduced, distributed, republished, downloaded, displayed, sold, compiled, posted or transmitted in any form or by any means, including but not limited to, electronic, mechanical, photocopying, recording or other means, without the prior express written permission of the Company.</p>
            <p>Company hereby grants you the right to access and use the Site only for your personal and non-commercial use. You may not use the Site for commercial purposes or in any way that is unlawful, or harms us or any other person or entity, as determined in our sole discretion.</p>
            <p>You may post/share links/images/text content on the site on social platforms like Facebook, Twitter, Google+, Pinterest, with appropriate link-back to the original source.</p>
            <p>When the Site provides for the download of particular Material including a software, you may download such Material or software to a computer or mobile device (as applicable) for your personal, non-commercial use only, provided that you (a) keep intact all copyright and other proprietary notices, (b) make no modifications to, and do not rent, lease, loan, sell, distribute, copy (except to create a single copy for your own back-up purposes), or create any derivative works based on the Material including the software, in whole or in part, and (c)  transfer any Material or software or any part thereof to any other computer of mobile device. Any commercial or business use of any Material including the Software is expressly prohibited.</p>
            <p>Except as expressly provided above, nothing contained herein shall be construed as conferring, by implication, estoppel or otherwise, any license or right under any patent, trademark or copyright of the Company or its suppliers.</p>
            <p>You acknowledge and agree that nothing in these terms of use shall have the effect of transferring the ownership of any copyrights, trademarks, service marks, trade names or other proprietary rights in the Material or any part thereof to you or any third party.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Prohibited Use</h1>
            <p>As a condition of your use of the Site, you will not use the Site for any purpose that is unlawful or prohibited by these Terms of Use or by any domestic or international laws, statutes, ordinances and regulations. Your use of site is your sole responsibility.</p>
            <p>You shall not, display, upload, modify, publish, transmit, update or share any information on the Site, that —</p>
            <ol>
              <li>belongs to another person and to which you do not have any right;</li>
              <li>is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner;</li>
              <li>involves the transmission of "junk mail," "chain letters," or unsolicited mass mailing or "spamming” or unsolicited commercial advertisement.</li>
              <li>harm minors in any way;</li>
              <li>infringes any patent, trademark, copyright or other proprietary rights;</li>
              <li>violates any law for the time being in force;</li>
              <li>deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</li>
              <li>impersonate another person</li>
              <li>contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;</li>
            </ol>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Use of Public Forum</h1>
            <p>Certain sections or pages of the Site may contain a provision for users to post or upload comments, feedback, data, links, videos, audios, graphics, images, messages and other material (“User Content”). Through the Public Forum you can communicate with other users of the Site.</p>
            <p>You are entirely responsible for all the User Content that you upload, post, email, transmit or otherwise make available on the Public Forum. You understand that such User Content can be viewed by other users of the Site and therefore you shall exercise due care to ensure that such User Content does not offend or abuse other users of the Site. Company does not control the User Content posted on the Public Forum and, as such, does not guarantee the accuracy, integrity or quality of such User Content. You understand that by using the Site, you may be exposed to User Content that is offensive, indecent or objectionable. Under no circumstances will Company be liable in any way for any User Content, including, but not limited to, for any errors or omissions in any User Content, or for any loss or damage of any kind incurred as a result of the use of any User Content posted, emailed, transmitted or otherwise made available on the Site.</p>
            <p>When you post or upload Your Content on the Site, you grant Company (and its licensees, distributors, agents, representatives and other authorised users), the rights a perpetual, royalty-free, non-exclusive, and irrevocable right and license to reproduce, prepare derivative works based upon, distribute, perform or display such User Content, in whole or in part, in any form, media or technology known or hereafter developed.</p>
            <p>User Content posted by you shall be subject to relevant laws and may be disabled, and may be subject to investigation under appropriate laws. You agree that the Company may disclose or preserve User Content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process; (b) respond to claims that any User Content violates the rights of third-parties; or (c) protect the rights, property, or personal safety of the Company and the public. Furthermore, if you are found to be in non-compliance with the laws and regulations, these Terms of Use, or the Privacy Policy of the Site, we may terminate your account/block your access to the Site and we reserve the right to remove any of User Content that is non-compliant with these Terms of Use.</p>
            <p>You agree that Company has no liability or responsibility for the storage or deletion of any User Content and reserves the right to change its general practices and limits at any time in its sole discretion, with or without notice.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Copyright and Trademarks</h1>
            <p>Unless otherwise stated, copyright and all intellectual property rights in all Materials on the Site (including but not limited to text, audio, video or graphical images, or technology, the look and feel of the Site), trademarks and logos appearing on this Site are the property of the Company and its suppliers and are owned and controlled by us or by other parties that have licensed their material to us. Materials on the Site are solely for your personal, non-commercial use. You may copy, reproduce, republish, upload, post, transmit or distribute such material in any way, including by e-mail or other electronic means and whether directly or indirectly given that you appropriately incorporate due credit to the artist in your reproduction. Without the prior written consent of the owner, modification of the Materials, use of the Materials on any other web site or networked computer environment or use of the Materials for any purpose other than personal, non-commercial use is a violation of the copyrights, trademarks and other proprietary rights, and is prohibited. Any use for which you receive any remuneration, whether in money or otherwise, is a commercial use for the purposes of this clause. You agree not to use any framing techniques to enclose any trademark or logo or other proprietary information of Company and its suppliers or remove, conceal or obliterate any copyright or other proprietary notice or any credit-line or date-line on other mark or source identifier included on the Site, including without limitation, the size, colour, location or style of all proprietary marks. Any infringement shall be vigorously defended and pursued to the fullest extent permitted by law.</p>
            <p>We respect other people’s intellectual property rights and if you believe that any content or material on the Site infringes on your intellectual property rights you can write to us at mailto:anonlinrreadingroom@gmail.com. </p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Disclaimer</h1>
            <p>The Site, all the Materials and products (including but not limited to software) and any services, included on or otherwise made available to you through this Site are gathered from a variety of sources and are intended solely as general information and provided on “as is” and “as available” basis without any representation or warranties, express or implied except otherwise specified in writing. Any specific advice or replies to queries in any part of the Site is/are the personal opinion of such experts/consultants/persons and does not constitute or indicate our endorsement, representation or warranty of such information and are not subscribed to by this Site.  Without prejudice to the forgoing paragraph, Company does not warrant that:</p>
            <ul>
              <li>The Site will be constantly available, or available at all; or</li>
              <li>The information on the Site is complete, legal, true, accurate or non-misleading.</li>
            </ul>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Links</h1>
            <p>Company may establish on the Site a hypertext link to a third party website from time to time. Such link is provided for information and convenience of the users and does not state or imply any sponsorship or endorsement of third party website by Company.  Company has no control over such third party website and your use of such third party website or any offsite dealings with such third parties is at your own risk.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">International Use</h1>
            <p>This Site is controlled and operated from within India. Company makes no representation that the Site is appropriate or available in locations outside the India. Those who choose to access the Site from other locations do so at their own risk and are responsible for compliance with applicable laws.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Limitation of Liability</h1>
            <p>YOU AGREE THAT COMPANY SHALL NOT BE LIABLE FOR ANY DIRECT, SPECIAL, INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND IN CONNECTION WITH THIS AGREEMENT OR YOUR USE OF SITE, EVEN IF COMPANY HAS BEEN INFORMED IN ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Indemnity</h1>
            <p>You agree to indemnify, defend and hold Company, its officers, directors, employees, affiliates or representatives harmless from any claim or action (including legal expenses) arising out your use of the Site, your breach of the Terms of Use and violation of any third party intellectual property rights or privacy.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Applicable Law</h1>
            <p>This Agreement shall be governed by and interpreted and construed in accordance with the laws of India. The place of jurisdiction shall be exclusively in Bangalore. Notwithstanding the foregoing, we reserve the right to pursue any action or claim against you in any court of competent jurisdiction which we believe is the most appropriate to seek any relief.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Entire Agreement</h1>
            <p>The Terms of, as amended from time to time, constitute the entire agreement between you and Company. If any provision of these Terms of use is considered unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from these Terms of Use and shall not affect the validity and enforceability of any remaining provisions.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Relationship</h1>
            <p>None of the provisions of the Terms of Use shall be deemed to constitute a partnership or agency between you and Company and you shall have no authority to bind Company in any manner, whatsoever. </p>
            <p>If you are registering on the Site as a business entity, you represent that you have the authority to bind the entity to this Agreement.</p>
          </section>
          <section class="flex flex-col gap-y-2">
            <h1 class="font-bold text-lg">Termination</h1>
            <p>We reserve the right, at our discretion, to immediately, with or without notice, suspend or terminate your registration, the Terms of Use, and/or your access to all or a portion of the Site and/or remove any registration information or User Content from the Site, for any reason. Upon termination or expiration of the Terms of Use, your obligations and Company’s rights and disclaimers survive, but your right to use the Site immediately ceases. Any express waiver or failure to exercise promptly any right under the Terms of Use will not create a continuing waiver or any expectation of non-enforcement.</p>
          </section>
        </MenuItem>
        {/if}
        <!-- Terms Menu Card End -->

      </div>
      {/if}
      <!-- menu card end -->
      
      <a href="{pathPrefix === '/' ? '/' : '/'}" class="self-center">
        <h1 class="text-2xl text-contrast">The Reading Room</h1>
      </a>
      
      <div class="w-10 h-10 focus:outline-none ml-auto text-accent">
          <button 
            on:click={viewMap}>
            <MapIcon active={openMap}/>
          </button>
      </div>
      <button class="w-10 h-10 focus:outline-none text-contrast"
              on:click={() => {
                openMenu = !openMenu; 
                openAboutMenu = false; 
                openFAQMenu = false;
                openTermsMenu = false;
                openWorldbuildersMenu = false; 
              }}>
        <MenuIcon />
      </button>
      
    </div>
  </div>
</header>

<Modal isOpenModal={loginModal} on:closeModal={(e) => loginModal = e.detail.isOpenModal} name="loginModal">
  <div class="px-4">
    <p>
        Please <a class="font-bold underline" href="/auth/login"
            >log in</a> to use this feature.
    </p>
  </div>
</Modal>