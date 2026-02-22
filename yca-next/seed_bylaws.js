const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ARTICLES = [
    {
        _id: 'preamble',
        articleNumber: '0',
        title: 'Preamble',
        sections: [
            {
                sectionNumber: 'P',
                label: 'Preamble',
                content: 'Whereas the Chakma youth of Mizoram and other States of India have resolved to unite into single organise Association to render voluntary services to the people and the society;\n\nWhereas, the “YOUNG CHAKMA ASSOCIATION” has already been formed in this regard and registered under Act XXI of the Societies Registration Act, 1860 under Registration No. SR.36 of 1978, dated Aizawl, the 25th October, 1978; and\n\nWhereas the Principal Constitution of the “YOUNG CHAKMA ASSOCIATION”, 1978 was found to contain errors and omission and which were required to be amended and revised in the 37th General Conference in 2015.\n\nWhereas the Revised Constitution of the “YOUNG CHAKMA ASSOCIATION”, 2015 was found to contain errors and omission and which were required to be amended and revised in the 40th General Conference in 2018.\n\nNow therefore, the revised Constitution of the “YOUNG CHAKMA ASSOCIATION,” 2018 is revised as under.'
            }
        ]
    },
    {
        _id: 'memorandum',
        articleNumber: 'M',
        title: 'Memorandum of the Association',
        sections: [
            {
                sectionNumber: 'M1',
                label: 'Name of the Association',
                content: 'The name of the Association shall be the “YOUNG CHAKMA ASSOCIATION” herein after referred to as the Association.'
            },
            {
                sectionNumber: 'M2',
                label: 'Registered Office',
                content: 'The registered Head Office or General Headquarters of the Association shall be situated at Kamalanagar, P.O. Kamalanagar, P.S. Chawngte, Lawngtlai District, Mizoram, PIN-796772 with requisite subordinate offices like Regional, District, Zonal and Branch which have already been established or to be established in future when felt necessary at any place where deemed fit.'
            },
            {
                sectionNumber: 'M3',
                label: 'Aims and Objects',
                content: '(a) To promote unity, integrity, sympathy, fellow feelings and to establish peace and friendly relations amongst all irrespective of castes, creeds and sex through love, compassion and peaceful co-existence;\n(b) To safeguard the interests and fundamental rights of the people in all aspects and to eradicate injustice to the poor and the background people;\n(c) To co-operate with the authorities in the maintenance of laws, orders and justices;\n(d) To promote, preserve, develop and reform the social custom and religious aspects;\n(e) To eradicate and free the people from inherited superstitious beliefs and habits; social evils like intoxication, gambling and other social bad habits;\n(f) To eradicate illiteracy and introduce adult education and to establish and run educational institutions including hostels;\n(g) To promote physical, mental and social well beings and sanitation conditions;\n(h) To promote cottage industries;\n(i) To publish or cause to be publish valuable literary work, paper, magazines, books, periodical etc. for the diffusion of knowledge and also development of literatures;\n(j) To establish and maintain vocational training institute to impart job oriented training;\n(k) To render voluntary services and necessary relief to the persons affected by accident or natural calamities;\n(l) To help educate the rural masses to uplift socio-economic standard;\n(m) To establish and run orphanage and destitute centers;\n(n) To establish and manage library and information centers for free reading by the public;\n(o) To create environmental consciousness among the people;\n(p) To accept any gifts, grants, donations, subscriptions or fees towards raising any funds on which the Association may proceed for financial provisions for the furtherance on the interests it represents;\n(q) To do all such other things as may be deemed incidental conducive to the achievement of the foregoing aims and objects.'
            }
        ]
    },
    {
        _id: '1',
        articleNumber: '1',
        title: 'SHORT TITLE, EXTENT AND COMMENCEMENT',
        sections: [
            { sectionNumber: '1(a)', label: 'Title', content: 'This shall be called the REVISED CONSTITUTION OF THE YOUNG CHAKMA ASSOCIATION, 2015 here in after referred to as the “CONSTITUTION”.' },
            { sectionNumber: '1(b)', label: 'Extent', content: 'This shall extent to the whole of Mizoram.' },
            { sectionNumber: '1(c)', label: 'Commencement', content: 'This shall come into force at once.' }
        ]
    },
    {
        _id: '2',
        articleNumber: '2',
        title: 'NAME OF THE ASSOCIATION',
        sections: [
            {
                sectionNumber: '2',
                label: 'Name',
                content: 'Name of the Association shall be known as “YOUNG CHAKMA ASSOCIATION”, “YCA” in short herein after referred to as the Association.'
            }
        ]
    },
    {
        _id: '3',
        articleNumber: '3',
        title: 'MEMBERSHIP',
        sections: [
            {
                sectionNumber: '3(1)',
                label: 'Qualification and Admission',
                content: 'A person desirous to become a member may apply through the prescribed Membership Form at ANNEXTURE-I to the Branch Committee. The following are eligible for membership to the Association: -'
            },
            {
                sectionNumber: '3(A)',
                label: 'PRIMARY MEMBER',
                content: 'Any Chakma irrespective of sex, and profession, who agrees in writing to be bound by the memorandum and the rules and regulations of the YOUNG CHAKMA ASSOCIATION shall be eligible for membership to the Association on payment of entry fees or other fees as prescribed by the Central Executive Committee from time to time”. Provided that he/she is must: (i) be a Chakma; (ii) be a citizen of India; (i) attains the minimum age of 15 years. Provided that any person can be a member of the YCA. However, prior approval must be taken from the Central Committee by the concern Branch before giving membership.'
            },
            {
                sectionNumber: '3(B)',
                label: 'DONER MEMBER',
                content: 'Any person, willing to be a ‘DONER MEMBER’ may be admitted by the concern Executive Committee on realization of a sum not less than Rs. 10,000/- as donation or having endowed movable or immovable properties whose value is not less than Rs. 10,000/-. Provided that the term of the DONOR MEMBER shall be for 10 years unless renewed with a payment of Rs. 10,000/-.'
            }
        ]
    },
    {
        _id: '4',
        articleNumber: '4',
        title: 'RIGHT AND OBLIGATION OF THE MEMBER',
        sections: [
            {
                sectionNumber: '4(1)',
                label: 'Rights',
                content: 'Any member of the Association has the right to:\na) Select/elect or to be selected/elected in any election of the Association at own level.\nb) Submit suggestions for discussion to the Executive Committee or to sub-committees on any matter;\nc) To hold more than one office simultaneously in different committees of the Association;\nd) Forgo his membership at any time after due information in writing;'
            },
            {
                sectionNumber: '4(2)',
                label: 'Obligations',
                content: 'A member of the Association shall be obliged to :-\na) Pay periodical subscriptions within prescribed time;\nb) Honor the decisions of the Executive Committee;\nc) Abide by the rules and regulations of the Association;\nd) Participate in the Association works and programmes.'
            }
        ]
    },
    {
        _id: '5',
        articleNumber: '5',
        title: 'CEASATION OF MEMBERSHIP',
        sections: [
            {
                sectionNumber: '5',
                label: 'Conditions',
                content: 'Membership of the Association shall cease: a) On submission of resignation from membership in writing to the President; b) On any act commission or omission contrary to the obligatory of membership; c) On conviction for any offence in connection with the formation, promotion, management or conduct of affairs of the Association or of any offence involving morals turpitudes. d) If he/she does not pay the periodical subscription within prescribed time period as decided by the respective Executive Committee.'
            }
        ]
    },
    {
        _id: '6',
        articleNumber: '6',
        title: 'REGISTER OF MEMBERS',
        sections: [
            {
                sectionNumber: '6',
                label: 'Register',
                content: 'The Association shall have a register of its member containing the names, father’s names, age, address, occupation, the date of admission and the date of cessation of the membership. The register shall be kept open for inspection by the members of the Association on request. Provided that, the Annual Activities and Financial Reports should be submitted by the Branch to the Zonal Office, the Zonal Office to the District Office, District Office to the “Regional-Headquarters (in case of states other than Mizoram), Zonal Office to the District Headquarter and District Headquarter and “Regional-Headquarters” to the Central Office by the end of December or before one month of the General Conference every year after compilation for maintaining proper records of the Association.'
            }
        ]
    },
    {
        _id: '7',
        articleNumber: '7',
        title: 'SET UP OF THE ASSOCIATION',
        sections: [
            {
                sectionNumber: '7(1)',
                label: 'Structure',
                content: 'The structure of the Association shall be as under: The Association shall primarily have only one wing consisting of both male and female members; with five types of committees viz: a) The Central Committee at the Centre or General Headquarters level; b) The “Regional-Headquarters” Committee at the State level in the states other than Mizoram. b.a) The District Committee at the District Headquarter. c) The Zonal Committee at the Zone Headquarter level under which there must be minimum ten YCA Branches d) A Branch Committee at the village level or at Sub-Village level. e) Deleted Provided that the Branch area may be divided into different sections according to geographical boundary and name the sections after the legendary heroes and heroine of the Chakmas. Each section shall consist of a Section Leader and two members. The Branch Executive Committee has the full power and responsibility in selecting the section members and to entrust responsibilities and guide them.'
            },
            {
                sectionNumber: '7(2)',
                label: 'Committees',
                content: 'The structure of the Committees are shown at the ANNEXTURE-II, showing that the Central Executive Committee is the Principal or Apex Committee at the General Headquarters, the Regional Executive Committee at the Regional-Headquarters in the State other than Mizoram subordinate to the Central Committee, District Executive Committee subordinate to the Central and the Regional Headquarters Committee, Zonal Executive Committee subordinate to the District Executive Committee and Branch Executive Committee subordinate to Zonal Committee respectively.'
            }
        ]
    },
    {
        _id: '8',
        articleNumber: '8',
        title: 'MEETING OF THE ASSOCIATION',
        sections: [
            {
                sectionNumber: '8(1)',
                label: 'General Meeting',
                content: '(1) a) A General Meeting of the Association shall be held once every year on at least 30 days prior notice at a place deemed fit by the Executive Committee. Provided that the President may summon a General meeting in a shorter period. b) In a general meeting/conference of the Association, the following Office Bearers/members shall represent: i. All the Office Bearers/Executive Members of Central Committee. ii. All Office Bearers from each ‘Regional Committee’ ii. a. All Office Bearers from each District Committee. iii. All Office Bearers from each District Committee. iv. All Office Bearers from each Zonal Committee. v. All Office Bearers from each Branch Committee including Section leaders. vi. Deleted Provided that the Central Committee can invite any member for participation in the General Conference / meeting.'
            },
            {
                sectionNumber: '8(2)',
                content: 'The General Meeting shall discuss on the Annual Report to be submitted by the General Secretary for the previous year and confirm the minutes. It shall also adopt the works of the Association for the subsequent year. It shall pass the audited accounts, and in addition to the followings: a) Amend the rules and regulations of the Association if any; b) Approve or disapprove any plans or schemes prepared by the Executive Committee for the next financial year; c) Take disciplinary action against the elected Executive Members; d) Approve or disapprove the budget prepared by the Executive Committee for the next financial year in whole or part; e) Dissolve the Executive body by 3/4 majority; f) Put the Association fund to Govt. Audit; g) To liquidate the Association by a decision of 3/4 majority; h) To consider/reject any private resolution that may have been forwarded by the President for discussion; i) Pass or drop any official/private resolution after discussion and voting.'
            }
        ]
    },
    {
        _id: '9',
        articleNumber: '9',
        title: 'EXECUTIVE COMMITTEE',
        sections: [
            {
                sectionNumber: '9',
                label: 'Formation',
                content: 'There shall be an Executive Committee for Central, Regional-Headquarters, District, Zonal and Branch Committee consisting of certain members as prescribed in section 11 in the Constitution. The formation of the Executive Committee at various level of the Association shall be constituted as per prescribed norms envisaged in the Section 31 in the Constitution.'
            }
        ]
    },
    {
        _id: '10',
        articleNumber: '10',
        title: 'MEETING OF THE EXECUTIVE COMMITTEE',
        sections: [
            {
                sectionNumber: '10(1)',
                label: 'Regular Meetings',
                content: 'The Executive Committee shall sit in meeting at least once in every 3 months with at least 3 days notice to all members to discuss any matter relating to the aims and objects of the Association and for resolution.'
            },
            {
                sectionNumber: '10(2)',
                label: 'Quorum',
                content: '3/5 of the total members of the Executive Committee members shall constitute the quorum.'
            },
            {
                sectionNumber: '10(3)',
                label: 'Special Meetings',
                content: 'A special meeting of the Executive Committee may be convened by the President or by the General Secretary of the respective Executive Committee to discuss on any specific agendum or agenda in a short notice.'
            }
        ]
    },
    {
        _id: '11',
        articleNumber: '11',
        title: 'STRUCTURE OF EXECUTIVE COMMITTEE',
        sections: [
            {
                sectionNumber: '11(1)(a)',
                label: 'Central/Regional/District Level',
                content: 'At the Central level, Regional-Headquarters level and District level: The Executive Committees shall consist of:\nOne President,\nTwo Vice-Presidents,\nOne General Secretary,\nTwo Office Secretaries,\nOne Joint Secretary,\nOne Organization Secretary,\nOne Cultural Secretary,\nOne Religious Secretary,\nOne Games and Sports Secretary,\nOne Education and Publication Secretary,\nOne Social Welfare Secretary,\nOne Finance Secretary,\nOne Treasurer and\nFourteen Executive Members but it should not exceed 29 members in all.'
            },
            {
                sectionNumber: '11(1)(b)',
                label: 'Zonal Level',
                content: 'Zonal Committee shall consist of 21 members such as:\nOne President,\nTwo Vice-Presidents,\nOne General Secretary,\nOne Office Secretary,\nOne Joint Secretary,\nOne Organization Secretary,\nOne Cultural Secretary,\nOne Religious Secretary,\nOne Games and Sports Secretary,\nOne Education and Publication Secretary,\nOne Social Welfare Secretary,\nOne Finance Secretary,\nOne Treasurer and\n8 Executive Members.'
            }
        ]
    },
    {
        _id: '12',
        articleNumber: '12',
        title: 'CEASATION OF EXECUTIVE COMMITTEE MEMBERSHIP',
        sections: [
            {
                sectionNumber: '12',
                label: 'Conditions',
                content: 'A member of any Executive Committee shall cease to be a member, if- a) He/ She resigned from his/her post at own accord; b) Disqualified or removed under any provision of rules and regulation of the Association; c) He affiliated his name to any political party (National or Regional) d) He contested in any Political Election.'
            }
        ]
    },
    {
        _id: '13',
        articleNumber: '13',
        title: 'DISQUALIFICATION',
        sections: [
            {
                sectionNumber: '13',
                label: 'Grounds',
                content: 'A member of the Association shall be disqualified, if – a) Two-Third of the Executive Members decide to do so; b) He/she remains absent from three consecutive meeting or from active participation in the works and programmes of the Association for a period exceeding 6 months without any leave or reasonable ground; c) He/she is found to be the cause of damage of the interest of the Association; and d) Is found to have committed an offence involving moral turpitudes. e) If he/she is found to be inactive and non-cooperative with the work of the Committee. Provided that any disqualification provided in the Constitution shall be subject to the approval of the Central Executive Committee who may at the same time overlooks or exempt such disqualification of a member. The name of the disqualified member from any Executive Committee may be deleted from Electoral Roll of the concern Office.'
            }
        ]
    },
    {
        _id: '14',
        articleNumber: '14',
        title: 'TERM OF THE EXECUTIVE COMMITTEE',
        sections: [
            {
                sectionNumber: '14(1)',
                label: 'Central Executive Committee',
                content: 'The tenure of the Central Executive Committee shall be 3 years from the date of its election/formation unless dissolved sooner.'
            },
            {
                sectionNumber: '14(3)',
                label: 'Zonal Executive Committee',
                content: 'The tenure of the Zonal Executive Committee shall be 3 years from the date of its approval unless dissolved sooner.'
            },
            {
                sectionNumber: '14(4)',
                label: 'Branch Executive Committee',
                content: 'The tenure of the Branch Executive Committee shall be 2 years from the date of its approval unless dissolved sooner.'
            }
        ]
    },
    {
        _id: '15',
        articleNumber: '15',
        title: 'RESPONSIBILITIES OF EXECUTIVE COMMITTEE',
        sections: [
            {
                sectionNumber: '15(1)',
                label: 'Central Executive Committee',
                content: 'The Central Executive Committee shall represent the Association and shall function on its behalf and be responsible to it collectively and individually for the functions it carries. It shall also be responsible for supervision and guidance of the subordinate Executive Committees.'
            },
            {
                sectionNumber: '15(4)',
                label: 'Branch Executive Committee',
                content: 'The Branch Executive Committee shall be subordinate to the Zonal, District, Regional-Headquarters and Central Executive Committee and shall function under the guidance of the Central, Regional-Headquarters, District and Zonal Committee.'
            }
        ]
    },
    {
        _id: '16',
        articleNumber: '16',
        title: 'POWER, FUNCTION AND DUTIES OF THE CENTRAL COMMITTEE',
        sections: [
            {
                sectionNumber: '16(1)',
                label: 'Functions',
                content: 'The Central Executive Committee shall function to fulfill the aims and objects of the Association and shall also: a) Summon general Meeting; b) Take up any plan or schemes for the fulfillment of any of the object of the Association; c) Keep proper account of the Association Funds; d) Supervise the functions of subordinate committees. e) Maintain register of members of all categories.'
            },
            {
                sectionNumber: '16(2)',
                label: 'Powers',
                content: 'The Central Executive Committee shall have the powers to: a) Take disciplinary action on any member of the Association and disqualify; b) Refuse enrolment as member of the Association; c) Make rules and regulations; d) Amend the Constitution in a General Meeting; e) Impeach the President and the Vice-President; f) Approve or disapprove the actions of subordinate committees; g) Approve subordinate committees; h) Deleted i) Detect and obstruct commission of any social crime and enter into or cause to enter into any private land or houses for the purpose; j) Sanction money for reward, expenditure or gift; k) Write off a loss of the Association where no individual is responsible. l) Confer any of its power to subordinate committees; m) Run any innocent business for raising its funds; n) Undertake any work of earning for raising its funds; o) Send delegate or depute for training of any member to any place in connection with the aims and objects of the Association; p) Function as village Police and compel an accused of social or customary offence to appear before any court; q) Direct the subordinate committees to submit any information and also the subscription share; r) The Central Executive Committee shall have the right to shift any subordinate office Headquarters if it deem so; s) Deleted Provided that the President may on behalf of the Central Executive Committee take action on clause (2) (a); (j); (p) and (q); when the Executive Committee is not in session.'
            }
        ]
    },
    {
        _id: '17',
        articleNumber: '17',
        title: 'POWER AND FUNCTION OF THE REGIONAL COMMITEE',
        sections: [
            {
                sectionNumber: '17',
                label: 'Powers',
                content: 'The Regional Office shall enjoy all the power as provided under Clause (1) and (2) of section 16 except (a) of sub-section (1) of section 16 and (d) and (r) of sub-section (2) of section 16 of the Constitution. Provided further that any member of the Association shall be competent to exercise the conferred under clause (2) (i) and (p).'
            }
        ]
    },
    {
        _id: '18',
        articleNumber: '18',
        title: 'POWER AND FUNCTION OF THE ZONAL COMMITTEE',
        sections: [
            {
                sectionNumber: '18(1)',
                label: 'Functions',
                content: 'a) summon all Branches committee Meeting once in a year; b) The Committee shall function to achieve the aims and objects of the Association within their respective jurisdiction under the guidance of the Central Committee; c) Keep proper account of the Zonal Funds; d) Supervise the functions of subordinate committees; e) Maintain register of members of all categories.'
            },
            {
                sectionNumber: '18(2)',
                label: 'Powers',
                content: 'The Executive Committee shall have the power within the jurisdiction as provided in clauses (1) and (2) of section 16 except (a) of sub-section (1) of section 16 and (c), (d) and (r) of sub-section (2) of section 16 of the Constitution.'
            }
        ]
    },
    {
        _id: '19',
        articleNumber: '19',
        title: 'POWER AND FUNCTION OF THE BRANCH COMMITTEE',
        sections: [
            {
                sectionNumber: '19',
                label: 'Power',
                content: 'The Branch Executive Committee shall have the power within the jurisdiction as provided in clauses (1) and (2) of section 16 except (a) and d) of sub-section (1) of section 16 and (c), (d), f), g), l), q) and (r) of sub-section (2) of section 16 of the Constitution.'
            }
        ]
    },
    {
        _id: '21',
        articleNumber: '21',
        title: 'POWER AND FUNCTIONS OF THE OFFICE BEARERS OF THE CENTRAL EXECUTIVE COMMITTEE',
        sections: [
            {
                sectionNumber: '21(1)',
                label: 'PRESIDENT',
                content: 'He/ She shall be the supreme functionary of the Association and such preside over all the meetings of the Association and the Central Executive Committee. In addition, he/ she shall: a) Declare the plan and programme of the Association but the same should place in the Executive Committee meeting for ex-post facto approval and supervise the functions of the Executive Committee; b) Take disciplinary action against any member of the Association; c) Sanction additional fund on any plan-scheme in the anticipation of approval by the Executive Committee; d) Caution the General Secretary and other office bearers and members and also call for the explanation for any misrule, conduct or misdeed and report such act before general meeting for action; e) He/ She shall, during the displeasure of the Executive Committee upon any member ask for resignation and also discharge such member; f) He/ She can receive all application for membership; g) He/ She shall sign all the letters for and on behalf of the Association and also receive and pay all bills; and h) do all other functions and duties as may be found conducive for the furtherance of the aims and objects of the Association.'
            },
            {
                sectionNumber: '21(3)',
                label: 'GENERAL SECRETARY',
                content: 'The General Secretary shall function as the chief executive of the Association and shall be responsible for the following: a) He/ She shall convene all meetings of the Association; b) Maintain minutes of the meeting; c) Sign all receipts on behalf of the Association; d) Maintain all records of the Association; e) Transact all other business of the Association as per the direction and approval of the Executive Committee; f) He/ She Shall be the supervising powers in the Executive Committee and may initiate disciplinary action against other members except the President and the Vice-President; g) He/ She shall be the custodian of the Association assets and drawing and disbursing authority; h) He/ She shall be the authority to distribute subjects to other office bearers and members in addition to their own and supervise their functions also issue necessary advice and guidance; i) He/ She shall prepare or cause to prepare and submit the annual report before Annual General Meeting;'
            }
        ]
    },
    {
        _id: '23',
        articleNumber: '23',
        title: 'FINANCE AND FUNDS',
        sections: [
            {
                sectionNumber: '23',
                label: 'Sources & Rules',
                content: '1. Membership and Subscription as envisaged in these by laws shall be the main source of the Association fund.\n2. The Association may also receive donation or subscriptions from general public and other willing patrons.\n3. The sale-proceeds of articles, books, magazines and periodicals and also other properties shall also be another source of income to the Association.\n4. The members of the Association may also render voluntary free labor on any work carrying an earning and that shall also bring fund to the Association.\n5. The Association may adopt other innocent ways and mean for raising fund for it.\n6. The Association may also run innocent business and which profit shall also be another source of income.\n7. The periodical subscriptions and entry fees receive by the Branches shall be shared with the Central, Regional, District and Zonal Committees. The amount shall be decided in the Annual Conference and from time to time and be submitted in the form of Annual Fee by the end of December.\n8. The fund received by or against Central Committee shall not be shared to any other committee. However the Central Committee may in furtherance of the aims and objects of the Association grant any amount to the subordinate committees. Likewise, the superior committees may grant fund to its subordinate committees.\n9. Profit from the business run by individual committees shall not be shared by any other Committees.\n10. All fund or properties shall be received against receipt in the ways prescribed by the Executive Committee of the Central Executive Committee.\n11. Proper accounts of all money shall be kept in a cash book by the Treasurer which shall be open for inspection by any member of the Executive Committee on two days requisition.\n12. Cash account shall be closed for every month signed by the treasurer and counter signed by the General Secretary who shall satisfy himself on such accounts before counter signing it.'
            }
        ]
    },
    {
        _id: '31',
        articleNumber: '31',
        title: 'ELECTION PROCEDURE',
        sections: [
            {
                sectionNumber: '31(1)',
                content: 'A committee member of own setup, shall first propose the nomination of a candidate that nomination be seconded by another member shall remain valid.'
            },
            {
                sectionNumber: '31(7)',
                content: 'A general election shall be conducted on or before the expiry of the tenure of an executive committee.'
            },
            {
                sectionNumber: '31(8)',
                content: 'In all level elections, the President, the Vice-President (s), the General Secretary and the Treasurer only shall be elected. A candidate contesting for a particular post shall be barred from contesting for other posts. The remaining Office-Bearers and the Executive Members shall be selected from the electorates enrolled in the concern Electoral Roll by the five/four elected members and form the Executive Committee.'
            }
        ]
    },
    {
        _id: '40',
        articleNumber: '40',
        title: 'FLAG AND SYMBOL',
        sections: [
            {
                sectionNumber: '40(1)',
                content: 'The flag of the Association shall be of three colours consisting the “WHITE” at the top, “GREEN” at the middle and “RED” at the bottom in equal shapes. The breadth of the flag shall be two-third of the length as shown in the ANNEXURE-VI.',
                hasFlagVideo: true
            },
            {
                sectionNumber: '40(2)',
                label: 'SYMBOL',
                content: 'The Association adopts the burning lamp as its symbol to represent its aims to eliminate the ignorant, illiteracy and superstition from the people and also to provide light of knowledge, education and development, etc.',
                hasSymbol: true
            }
        ]
    },
    {
        _id: '41',
        articleNumber: '41',
        title: 'SCOPE OF AMENDMENT',
        sections: [
            {
                sectionNumber: '41',
                content: 'This Constitution may be amended by the Central Committee in a General Meeting from time to time.'
            }
        ]
    }
];

async function seedBylaws() {
    console.log('🚀 Starting Bylaws Seeding...');

    try {
        // 1. Clear existing to prevent duplicates (Be careful in production!)
        console.log('🧹 Cleaning old data...');
        await supabase.from('bylaw_sections').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('bylaws').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        for (const art of ARTICLES) {
            const { data: bData, error: bError } = await supabase.from('bylaws').insert({
                article_number: art.articleNumber,
                title: art.title
            }).select().single();

            if (bError) {
                console.error(`❌ Error inserting article ${art.articleNumber}:`, bError.message);
                continue;
            }

            console.log(`✅ Inserted Article ${art.articleNumber}: ${art.title}`);

            const sections = art.sections.map((sec, index) => ({
                bylaw_id: bData.id,
                section_number: sec.sectionNumber,
                label: sec.label || null,
                content: sec.content,
                display_order: index,
                has_flag_video: sec.hasFlagVideo || false,
                has_symbol: sec.hasSymbol || false
            }));

            const { error: sError } = await supabase.from('bylaw_sections').insert(sections);
            if (sError) {
                console.error(`  ❌ Error inserting sections for ${art.articleNumber}:`, sError.message);
            } else {
                console.log(`  ✨ Inserted ${sections.length} sections for Article ${art.articleNumber}.`);
            }
        }
        console.log('\n🏁 Seeding Complete! All 41 Articles are now in Supabase.');
    } catch (err) {
        console.error('💥 Fatal Error:', err.message);
    }
}

seedBylaws();
