# Apex CCG — WIL presentation

An executive presentation with exactly **10 slides** for XBIT7329 Work Integrated Learning 3. The project is plain HTML, CSS and JavaScript. No build, package installation, internet connection, account or API key is required.

## Run in VS Code

1. Extract the ZIP into a folder.
2. Open that folder in VS Code.
3. Keep `index.html`, `style.css` and `app.js` together.
4. Open `index.html`, then select **Go Live** in Live Server.
5. The presentation fills the browser window automatically. Press **F** for fullscreen and **H** to reveal or hide the floating controls.

You can also open `index.html` directly in a current desktop browser. Live Server is the intended workflow. The original Apex logo is embedded in `index.html`, so there is no separate image to download or link.

```text
apex-wil-presentation/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Presentation controls

| Control | Action |
| --- | --- |
| Right arrow, Down arrow, Space, Page Down | Next slide |
| Left arrow, Up arrow, Backspace, Page Up | Previous slide |
| Home / End | First / final slide |
| 1–9 / 0 | Jump to slide 1–9 / 10 |
| F | Toggle fullscreen |
| H | Reveal or hide floating controls |
| O | Open slide overview |
| B | Blank or restore the screen |
| Escape | Close a dialog or restore a blanked screen |
| P | Print all ten slides or save as PDF |
| ? | Presentation controls |
| Horizontal touch swipe | Previous or next slide |

Controls appear in a floating toolbar. Move the pointer to the bottom edge, use Tab, or press H to reveal it. The toolbar recedes when idle. H pins or hides it. Navigation stops at the first and final slides. Refreshing retains the current slide through its URL hash. The dashboard's legend filters its synthetic work queue. Clicking an active legend item or **Show all** restores the full dashboard.

Print uses ten landscape pages. Choose **Save as PDF**, leave browser headers and footers off, and enable background graphics if your browser asks. The print layout temporarily resets the dashboard to its complete illustrative view and restores your filter afterwards.

## Lecturer requirement coverage

| Requirement | Slide |
| --- | --- |
| Background and company identity | 1–2 |
| Objectives and deliverables | 3 |
| Gantt schedule | 4 |
| As-is BPMN | 5 |
| To-be BPMN | 7 |
| Data visualisation supporting the to-be process | 8 |
| One business process and at least two IT solutions | 5, 7, 9 |
| Other relevant analysis | Focused SWOT on 2; eight gaps on 5; prioritised requirements and acceptance hints on 6; conclusion, recommendation and key takeaways on 10 |
| Company logo | Original Task 2 logo embedded on 1 |
| Exactly 8–10 slides | Exactly 10 `<section class="slide">` elements |

## Source documents reviewed

1. The Independent Institute of Education (2026). **Work Integrated Learning 3 Module Manual, XBIT7329/p/w** (`xbitMM(9).pdf`, 46 pages). Presentation guidance: p. 8. Group project and analysis requirements: pp. 18–22. Project report rubric: pp. 32–33.
2. **Task 1: Professional Conduct & WIL Onboarding** (`BIT_WIL_TASK1_ST10247670_ESSACK(6).pdf`, 26 pages). Used for the simulated Johannesburg organisation, exact process boundary, group identities, professional conduct and confidentiality controls.
3. **Task 2: Project Plan** (`BIT_WIL_TASK2_ST10247670_ESSACK(9).pdf`, 32 pages). Used for background, objectives, roles, scope, outputs, dates, milestones and both high-level solution directions. The logo is the image embedded on the cover, extracted from the rendered PDF cover without altering the artwork.

Source references and evidence notes are kept in this README. All slide footer commentary and source references have been removed. Press **?** for presentation controls.

## Evidence and interpretation

- This is a **simulated business analysis project**. The deck does not claim software delivery, live operational results, supplier interviews or a production implementation.
- The as-is BPMN is a reasoned Level 1 model of the scenario described in Task 2. The source supplies a project plan, not an independently validated completed process report. The to-be BPMN, focused SWOT, eight-gap summary and 12 requirements develop that scenario for presentation.
- The model contains one selected lifecycle. The Supplier and Client team are external participants, with dashed message flows. Solid sequence flows remain inside the Apex pool. The pool's lanes divide intake/validation from decision/follow-up. An exclusive gateway returns invalid evidence for correction. The to-be correction loop passes through storage again to preserve revisions. A collapsed subprocess contains recurring renewal monitoring and reporting.
- The objective dates are **planned targets**. The Gantt preserves the Task 2 baseline of **17 September–12 November 2026**. It does not imply that every planned milestone happened. Task 2 records plan approval on **2 October 2026**, against the original 24 September baseline checkpoint.
- Task 2 calls for 12–18 requirements, whereas the manual calls for 8–12 initial requirements. **Twelve** satisfies both ranges. Task 2 calls for at least eight gaps, while the manual asks for 5–8. **Eight** satisfies both.
- Task 2 schedules two directions: a **central workflow platform** and **configured low-code case management**. The deck uses those exact conceptual directions. The five weights and qualitative comparison are proposed analysis. No brand-specific capability, live vendor quote, product test or approved procurement decision is invented. The preferred direction remains conditional on verified fit, controls and total cost.
- No completed Mini-RFC feedback was attached. The deck treats the Mini-RFC as a planned validation step and does not invent reviewers' comments, dates, changes or sign-off. The Task 2 plan approval is not presented as Mini-RFC approval of this proposed design.
- Implementation, procurement, detailed architecture, migration, testing and deployment stay outside the project's scope.

## Illustrative dashboard data

`DEMO_CASES` in `app.js` contains twelve explicitly synthetic supplier cases, referenced to the fixed demonstration date **29 October 2026**. No personal information is included.

| Status | Count |
| --- | ---: |
| Approved current | 5 |
| Under review | 3 |
| Evidence missing | 2 |
| Expiring soon | 1 |
| Expired | 1 |
| **Total** | **12** |

The two renewal exceptions are the due-soon and expired cases. The seven actionable cases are all cases other than approved current. The due-soon case expires on 12 November, 14 days after the demonstration date. The expired case expired on 20 October, nine days before it. Data validation checks unique IDs, status values and expiry consistency at startup. The ring chart, counts, filtered queue and summaries all derive from that dataset.

## Editing

- Edit slide wording in `index.html`. Source details are kept in this README.
- Edit colours, type and layout in `style.css`.
- Edit the Gantt data, BPMN builders, synthetic dashboard cases and controls in `app.js`.
- The responsive canvas uses **1600 × 900** as its minimum design coordinates. It grows along the spare axis and scales uniformly to fill the entire browser window, preserving text and shape proportions. Wide displays place process control notes beside the BPMN model. The print canvas remains 1600 × 900. Present on a desktop/laptop in fullscreen for readable projection.
- The code uses local files, embedded Apex Sans and Caladea fonts, and SVG graphics. It makes no network requests.
- All three group members are credited using the identities and roles in the supplied submissions. The presentation does not impose a speaking allocation.

The extra preview configuration used during development is not included in the downloadable project.

## Executive visual edition

This edition uses a restrained ink, ivory and sage palette; editorial typography; an architectural operating-model illustration; fine rules; and explicit visual hierarchy. All graphics remain coded SVG or CSS. The company logo remains embedded. Both font families are embedded in the CSS. There are no external assets or network dependencies.

Text enters once per slide. Process arrows, message flows, cover paths and Gantt highlights repeat on a three-second cycle. The underlying graphics stay visible throughout. Message flows remain dashed. Reduced-motion preferences disable motion. Loops stop before printing and resume afterwards.

The slides occupy the complete browser window without a frame or dedicated toolbar strip. Uniform scaling avoids distorted text and shapes. Content uses responsive spacing and grows along the spare dimension. At wide aspect ratios, process control notes move into a side column. The floating toolbar is available at the bottom edge or with H, and F uses the browser fullscreen API where supported.

All ten slide footers and source links remain removed. Source details and evidence boundaries are kept in this README. The project still covers exactly ten slides, with the original requirements, baseline schedule, process logic, illustrative data and conditional recommendation.

Browser QA covers the normal desktop window, a 1920 × 1080 projector, a 1920 × 900 wide display and a 1024 × 768 display. The development-only viewport harness is excluded from the ZIP.

## Final polish

Slides 1, 3, 5, 7 and 9 share the same ink background (#0c1e28). Slides 2, 4, 6, 8 and 10 share the same ivory background (#f5f6f2).

Carlito-derived Apex Sans provides the clean sans-serif text. Caladea provides the editorial display typography. The font outlines are unchanged and packaged as embedded WOFF files, so typography stays consistent offline without a font installation.

Graphic highlights use an exact 3,000 ms cycle. They run only on the active slide, pause when the page is hidden, a dialog is open or the screen is blanked, and respect reduced-motion settings. The base arrows and Gantt bars remain visible at all times. Text does not repeatedly fade or move. Assessment-related commentary is absent from the projected slides.

Slides 1–9 retain their original wording, schedule, dashboard and solution comparison. Slide 10 uses the revised conclusion: the central workflow recommendation, three takeaways and a key-takeaway panel, followed by a thank-you and discussion invitation. The Project boundary box and planned-validation panel are removed from slide 10.

The converted Carlito family is named Apex Sans to respect the original reserved font name. Its glyph outlines are unchanged.

## Embedded font notices

Carlito: Copyright (c) 2010–2013 by tyPoland Lukasz Dziedzic, with Reserved Font Name “Carlito”. Licensed under the SIL Open Font License, Version 1.1.

Caladea: Copyright (c) 2012 Huerta Tipografia. Designers: Carolina Giovagnoli and Andres Torresi. Licensed under the Apache License, Version 2.0.

### Carlito licence

```text
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
“Font Software” refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

“Reserved Font Name” refers to any names specified as such after the
copyright statement(s).

“Original Version” refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

“Modified Version” refers to any derivative made by adding to, deleting,
or substituting — in part or in whole — any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

“Author” refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```

### Caladea licence

```text

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

```
