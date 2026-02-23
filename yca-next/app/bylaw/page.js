'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { bylawsAPI } from '@/app/lib/api';

const FlagAnimation = () => {
    const videoRef = useRef(null);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            if (videoRef.current.currentTime >= 7) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
            <video
                ref={videoRef}
                src="/flag_video_loop_v2.mp4"
                autoPlay
                muted
                loop={false}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-auto object-cover"
            />
        </div>
    );
};

export default function BylawPage() {
    const [search, setSearch] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeArticle, setActiveArticle] = useState(null);

    const FALLBACK_ARTICLES = [
        {
            _id: 'preamble',
            articleNumber: 0,
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
                },
                {
                    sectionNumber: 'M4',
                    label: 'Governing Body',
                    content: 'The name, address, occupation and designation of the present members of the Executive Body to whom the management of the Association is entrusted are given below:',
                    members: [
                        { name: 'Rajiv Kumar Chakma', address: 'Kamalanagar-II', occupation: 'DSPO, CADC', designation: 'President' },
                        { name: 'Santosh Chakma', address: 'Kamalanagar-II', occupation: '', designation: 'Vice-President' },
                        { name: 'A. Bindulal Chakma', address: 'Kamalanagar-II', occupation: 'JE, PHE', designation: 'Vice-President' },
                        { name: 'Roymanikyo Chkma', address: 'Kamalanagar-II', occupation: 'LO, CADC', designation: 'General Secretary' },
                        { name: 'D. Kalomoy Chakma', address: 'Kamalanagar-II', occupation: 'Teacher, CADC', designation: 'Office Secretary' },
                        { name: 'Milon Chakma', address: 'Kamalanagar-II', occupation: 'Teacher, P/S, CADC', designation: 'Organizing Secy.' },
                        { name: 'Jyoti Bikash Chakma', address: '', occupation: 'UPST, SSA', designation: 'Office Secretary' },
                        { name: 'B. Tarun Bikash Chakma', address: 'Kamalanagar-I', occupation: 'UPST, LADC', designation: 'Joint Secretary' },
                        { name: 'Tribanko Chakma', address: 'Bajeisora', occupation: 'UDC, CADC', designation: 'Cultural Secretary' },
                        { name: 'Chipam Chakma', address: 'Kamalanagar-III', occupation: 'UPST, SSA', designation: 'Edn. & Pub. Secy.' },
                        { name: 'Prema Rattan Chakma', address: 'Kamalanagar-II', occupation: 'Teacher, CADC', designation: 'Game Sport Secy.' },
                        { name: 'B. Biniya Chakma', address: 'Kamalanagar-IV', occupation: 'LDC, CADC', designation: 'Religious Secy.' },
                        { name: 'Buddhankur Chakma', address: 'Kamalanagar-III', occupation: 'FAO, CADC', designation: 'Social Welf. Secy.' },
                        { name: 'F. Raju Chakma', address: 'Kamalanagar-III', occupation: 'FO, CADC', designation: 'Finance Secretary' },
                        { name: 'K. Chandra Chakma', address: 'Kamalanagar-I', occupation: 'Teacher, CADC', designation: 'Treasurer' },
                        { name: 'Pronoti Chakma', address: 'Kamalanagar-I', occupation: '', designation: 'E. M' },
                        { name: 'Pranit Bikash Chakma', address: 'Kamalanagar-II', occupation: 'PDO, CADC', designation: 'E. M' },
                        { name: 'B.H Binoy Bishwar Chakma', address: 'Kamalanagar-III', occupation: 'UPST, CADC', designation: 'E. M' },
                        { name: 'Dr. Jyotir Moy Chakma', address: 'Kamalanagar-I', occupation: 'Assistant Professor', designation: 'E. M' },
                        { name: 'Santosh Chakma (BPS)', address: 'Borapansury', occupation: 'Teacher, P/S', designation: 'E. M' },
                        { name: 'Gyana Mongal Chakma', address: 'Kamalanagar-I', occupation: 'VLAA', designation: 'E. M' },
                        { name: 'F. Darpan Chakma', address: 'Kamalanagar-III', occupation: 'Teacher', designation: 'E. M' },
                        { name: 'Jackson Chakma', address: 'Kamalanagar-II', occupation: 'UPST, CADC', designation: 'E. M' },
                        { name: 'Dayaraj Chakma', address: 'Kamalanagar-II', occupation: 'Cashier, CADC', designation: 'E. M' },
                        { name: 'Sangeeta Chakma', address: 'Kamalanagar-III', occupation: 'LDC, CADC', designation: 'E. M' },
                        { name: 'Bijoy Chakma', address: 'Kamalanagar-II', occupation: 'Teacher, CADC', designation: 'E. M' },
                        { name: 'Lokkhi Joy Chakma', address: 'Kamalanagar-III', occupation: 'UPST, CADC', designation: 'E. M' },
                        { name: 'Anupam Chakma', address: 'Borapansury', occupation: 'UPST, SSA', designation: 'E. M' },
                        { name: 'Molin Kumar Chakma', address: 'Bajeisora', occupation: 'Social Worker', designation: 'E. M' }
                    ]
                },
                {
                    sectionNumber: 'M5',
                    label: 'DESIROUS PERSON',
                    content: 'We the undersigned are desirous of forming a society namely “YOUNG CHAKMA ASSOCIATION” in pursuance of this Memorandum of Association of the Society',
                    footer: true,
                    members: [
                        { name: 'Ramani Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Punya Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Anup Kumar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Dilip Kumar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Miss Chandra Prova Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Miss Namita Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Nalini Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Dasharath Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Ananda Kumar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Binanda Kumar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Pravakar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Hiran Kumar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Sukumar Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Puspa Sen Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Brama Kanta Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Kunta Bikash Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Sundra Kanta Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Buddha Kanta Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Prasanta Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Tara Chand Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' },
                        { name: 'Sunil Chakma', address: 'Kamalanagar', occupation: 'Social Worker', designation: '[Signed]' }
                    ]
                }
            ]
        },
        {
            _id: '1',
            articleNumber: 1,
            title: 'SHORT TITLE, EXTENT AND COMMENCEMENT',
            sections: [
                { sectionNumber: '1(a)', label: 'Title', content: 'This shall be called the REVISED CONSTITUTION OF THE YOUNG CHAKMA ASSOCIATION, 2015 here in after referred to as the “CONSTITUTION”.' },
                { sectionNumber: '1(b)', label: 'Extent', content: 'This shall extent to the whole of Mizoram.' },
                { sectionNumber: '1(c)', label: 'Commencement', content: 'This shall come into force at once.' }
            ]
        },
        {
            _id: '2',
            articleNumber: 2,
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
            articleNumber: 3,
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
                },
                {
                    sectionNumber: '3(C)',
                    label: 'LIFE MEMBER',
                    content: 'Deleted'
                }
            ]
        },
        {
            _id: '4',
            articleNumber: 4,
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
            articleNumber: 5,
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
            articleNumber: 6,
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
            articleNumber: 7,
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
                },
                {
                    sectionNumber: '7(3)',
                    label: 'Deleted',
                    content: 'Deleted'
                }
            ]
        },
        {
            _id: '8',
            articleNumber: 8,
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
                },
                {
                    sectionNumber: '8(3)',
                    label: 'Competence',
                    content: '(3) The General Meeting shall the competence to: Write off any loss of asset(s) of the Association for which no individual is responsible.'
                }
            ]
        },
        {
            _id: '9',
            articleNumber: 9,
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
            articleNumber: 10,
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
                },
                {
                    sectionNumber: '10(4)',
                    label: 'Presiding Officer',
                    content: 'The President or in his absent the Vice President shall preside over the meeting of an Executive Committee. In absence of the President or the Vice President the members shall elect a member to preside over the meeting and who also exercise the powers and function of the President in that particular meeting.'
                },
                {
                    sectionNumber: '10(5)',
                    label: 'Voting',
                    content: 'All matters shall be decided on majority of vote of the members present in the meeting and in the event of equality of votes the person presiding over a meeting shall have the right to cast a deciding vote.'
                }
            ]
        },
        {
            _id: '11',
            articleNumber: 11,
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
                },
                {
                    sectionNumber: '11(1)(c)',
                    label: 'Branch Level',
                    content: 'Branch Committee shall consist of 18 members such as:\nOne President,\nOne Vice-Presidents,\nOne General Secretary,\nOne Joint Secretary,\nOne Office Secretary,\nOne Organization Secretary,\nOne Cultural Secretary,\nOne Religious Secretary,\nOne Games and Sports Secretary,\nOne Education and Publication Secretary,\nOne Social Welfare Secretary,\nOne Treasurer and\n6 Executive Members.'
                },
                {
                    sectionNumber: '11(1)(d)',
                    label: 'Deleted',
                    content: 'Deleted'
                },
                {
                    sectionNumber: '11(2)',
                    label: 'Determination of Formation',
                    content: '(i) The formation of Executive Committee at the Regional-Headquarters level and District level shall be determined by the Central Executive Committee. ii) The formation of Executive Committee at the Zonal level shall be determined by District Executive Committee. iii) Branch Executive Committee shall be determined by the Zonal Executive Committee and iv) Deleted'
                },
                {
                    sectionNumber: '11(3)',
                    label: 'Multiple Posts',
                    content: 'There shall remain no bar to hold more than one post at different level committees at a time.'
                },
                {
                    sectionNumber: '11(4)',
                    label: 'Subordinate Committees',
                    content: 'The Central Executive Committee or the Regional-Headquarters may decide to create subordinate committees for such an area when the numbers of Branch of Association are quite sufficient for the purpose.'
                }
            ]
        },
        {
            _id: '12',
            articleNumber: 12,
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
            articleNumber: 13,
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
            articleNumber: 14,
            title: 'TERM OF THE EXECUTIVE COMMITTEE',
            sections: [
                {
                    sectionNumber: '14(1)',
                    label: 'Central Executive Committee',
                    content: 'The tenure of the Central Executive Committee shall be 3 years from the date of its election/formation unless dissolved sooner.'
                },
                {
                    sectionNumber: '14(2)',
                    label: 'Regional-Headquarters Executive Committee',
                    content: 'The tenure of the Regional-Headquarters Executive Committee shall be 3 years from the date of its election/formation unless dissolved sooner.'
                },
                {
                    sectionNumber: '14(2)(a)',
                    label: 'District Executive Committee',
                    content: 'The tenure of the District Executive Committee shall be 3 years from the date of its election/formation unless dissolved sooner.'
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
                },
                {
                    sectionNumber: '14(5)',
                    label: 'Extensions',
                    content: 'Deleted. Provided that the tenure of the Central Executive Committee, Regional - Headquarters Executive Committees and the Zonal Committee may be extended by the Executive Committee of the Association (Central Executive Committee) and the tenure of the Branch Executive Committee may be extended by the concern Zonal President for a period not exceeding to six months.'
                }
            ]
        },
        {
            _id: '15',
            articleNumber: 15,
            title: 'RESPONSIBILITIES OF EXECUTIVE COMMITTEE',
            sections: [
                {
                    sectionNumber: '15(1)',
                    label: 'Central Executive Committee',
                    content: 'The Central Executive Committee shall represent the Association and shall function on its behalf and be responsible to it collectively and individually for the functions it carries. It shall also be responsible for supervision and guidance of the subordinate Executive Committees.'
                },
                {
                    sectionNumber: '15(2)',
                    label: 'Regional-Headquarters Executive Committee',
                    content: 'The Regional-Headquarters Executive Committee shall function under the guidance of the Central Committee. It shall also supervise the works of the subordinate District Executive Committee, Zonal Executive Committee and Branch Committee and shall be responsible to Central Executive Committee.'
                },
                {
                    sectionNumber: '15(3)(a)',
                    label: 'District Executive Committee',
                    content: 'The District Executive Committee shall function under the guidance of Central Executive Committee and Regional Executive Committee in case of the States other than Mizoram. It shall also supervise the works of the subordinate Zonal Executive Committee and Branch Committee and shall be responsible to its Regional-Headquarters and Central Executive Committee.'
                },
                {
                    sectionNumber: '15(3)',
                    label: 'Zonal Executive Committee',
                    content: 'The Zonal Executive Committee shall be subordinate to the District, Regional and Central Executive Committee and shall function under its guidance. It shall also supervise the works of the subordinate Branch Committee and shall be responsible to its District, Regional-Headquarters and Central Executive Committee.'
                },
                {
                    sectionNumber: '15(4)',
                    label: 'Branch Executive Committee',
                    content: 'The Branch Executive Committee shall be subordinate to the Zonal, District, Regional-Headquarters and Central Executive Committee and shall function under the guidance of the Central, Regional-Headquarters, District and Zonal Committee.'
                },
                {
                    sectionNumber: '15(5)',
                    label: 'Contradictions',
                    content: 'Deleted Provided that when there is any contradiction between the Central, District and Zonal Committees in respect of supervisory direction to branch committees, the direction of the Central Committee shall be final.'
                }
            ]
        },
        {
            _id: '16',
            articleNumber: 16,
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
            articleNumber: 17,
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
            _id: '17.a',
            articleNumber: '17(a)',
            title: 'POWER AND FUNCTION OF THE DISTRICT COMMITEE',
            sections: [
                {
                    sectionNumber: '17(a)',
                    label: 'Powers',
                    content: 'The District Office shall enjoy all the power as provided under Clause (1) and (2) of section 16 except (a) of sub-section (1) of section 16 and (c), (d) and (r) of sub-section (2) of section 16 of the Constitution.'
                }
            ]
        },
        {
            _id: '18',
            articleNumber: 18,
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
                },
                {
                    sectionNumber: '18(3)',
                    label: 'Suggestions',
                    content: 'It may also submit suggestion or any matter of the Association to the Central Committee.'
                }
            ]
        },
        {
            _id: '19',
            articleNumber: 19,
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
            _id: '20',
            articleNumber: 20,
            title: 'Deleted',
            sections: [
                {
                    sectionNumber: '20',
                    label: 'Deleted',
                    content: 'Deleted'
                }
            ]
        },
        {
            _id: '21',
            articleNumber: 21,
            title: 'POWER AND FUNCTIONS OF THE OFFICE BEARERS OF THE CENTRAL EXECUTIVE COMMITTEE',
            sections: [
                {
                    sectionNumber: '21(1)',
                    label: 'PRESIDENT',
                    content: 'He/ She shall be the supreme functionary of the Association and such preside over all the meetings of the Association and the Central Executive Committee. In addition, he/ she shall: a) Declare the plan and programme of the Association but the same should place in the Executive Committee meeting for ex-post facto approval and supervise the functions of the Executive Committee; b) Take disciplinary action against any member of the Association; c) Sanction additional fund on any plan-scheme in the anticipation of approval by the Executive Committee; d) Caution the General Secretary and other office bearers and members and also call for the explanation for any misrule, conduct or misdeed and report such act before general meeting for action; e) He/ She shall, during the displeasure of the Executive Committee upon any member ask for resignation and also discharge such member; f) He/ She can receive all application for membership; g) He/ She shall sign all the letters for and on behalf of the Association and also receive and pay all bills; and h) do all other functions and duties as may be found conducive for the furtherance of the aims and objects of the Association.'
                },
                {
                    sectionNumber: '21(2)',
                    label: 'VICE-PRESIDENT',
                    content: 'The Vice President shall have supervisory powers and in absence of the president function as the president. They shall assist the president in all affairs.'
                },
                {
                    sectionNumber: '21(3)',
                    label: 'GENERAL SECRETARY',
                    content: 'The General Secretary shall function as the chief executive of the Association and shall be responsible for the following: a) He/ She shall convene all meetings of the Association; b) Maintain minutes of the meeting; c) Sign all receipts on behalf of the Association; d) Maintain all records of the Association; e) Transact all other business of the Association as per the direction and approval of the Executive Committee; f) He/ She Shall be the supervising powers in the Executive Committee and may initiate disciplinary action against other members except the President and the Vice-President; g) He/ She shall be the custodian of the Association assets and drawing and disbursing authority; h) He/ She shall be the authority to distribute subjects to other office bearers and members in addition to their own and supervise their functions also issue necessary advice and guidance; i) He/ She shall prepare or cause to prepare and submit the annual report before Annual General Meeting;'
                },
                {
                    sectionNumber: '21(4)',
                    label: 'JOINT SECRETARY',
                    content: 'a) He/ She shall be the main assistant of the General Secretary and in absence of the General Secretary function as General Secretary; b) He/ She shall deal with the subject allotted by the General Secretary;'
                },
                {
                    sectionNumber: '21(5)',
                    label: 'OFFICE SECRETARY',
                    content: 'He/ She assist the General Secretary and formulate the official works. He/ She is also responsible for the proper custody of the office records.'
                },
                {
                    sectionNumber: '21(6)',
                    label: 'FINANCE SECRETARY',
                    content: 'He/ She shall maintain the proper Account of the Association fund separately and deal with the related subject allotted to him by the authority of the Association.'
                },
                {
                    sectionNumber: '21(7)',
                    label: 'ORGANISATION OR ORGANISING SECREATARY',
                    content: 'He/ She shall look after the organization section.'
                },
                {
                    sectionNumber: '21(8)',
                    label: 'CULTURAL SECRETARY',
                    content: 'He/ She shall look after the cultural section of the Association.'
                },
                {
                    sectionNumber: '21(9)',
                    label: 'RELIGIOUS SECRETARY',
                    content: 'He/ She shall look after the religious chapter of the Association.'
                },
                {
                    sectionNumber: '21(10)',
                    label: 'EDUCATION AND PUBLICATION SCERETARY',
                    content: 'He/ She shall look after the publication sector of the Association.'
                },
                {
                    sectionNumber: '21(11)',
                    label: 'SOCIAL WELFARE SECRETARY',
                    content: 'He/ She shall look after the welfare sector of the Association.'
                },
                {
                    sectionNumber: '21(12)',
                    label: 'GAMES AND SPORTS SECRETARY',
                    content: 'He/ She shall look after the Games and Sports side of the Association.'
                },
                {
                    sectionNumber: '21(13)',
                    label: 'TREASURER',
                    content: 'He/ She shall collect and receive all records and vouchers and also keep proper accounts of the Association funds. He/ She shall be responsible for receipt and payment of money of the Association. He/ She shall issue receipt for all payment made to the Association and collect vouchers for the disbursement made by and on behalf of the Association.'
                },
                {
                    sectionNumber: '21(14)',
                    label: 'OFFICE BEARERS OF REGIONAL, DISTRICT, ZONAL AND BRANCH OFFICES',
                    content: 'The office bearers and members of the Regional, District, Zonal and Branch Executive Committees shall have and exercise same powers and functions as that of Central Executive Committee within the respective jurisdiction and level.'
                }
            ]
        },
        {
            _id: '22',
            articleNumber: 22,
            title: 'IMPEACHMENT OF PRESIDENT AND VICE PRESIDENT',
            sections: [
                {
                    sectionNumber: '22(1)',
                    label: 'Motion',
                    content: '(1) The President and the Vice President in all level committees may be impeached with a motion and placed in the executive committee meeting duly sign by not less than 2 elected members first. If the motion is supported by 3/4 of the member present, the said President or the Vice-President is moved.'
                },
                {
                    sectionNumber: '22(2)',
                    label: 'Penal',
                    content: 'There shall be a penal constituted by the majority of the member to select/elect the new president/vice president in the committee.'
                }
            ]
        },
        {
            _id: '23',
            articleNumber: 23,
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
            _id: '24',
            articleNumber: 24,
            title: 'AUDIT',
            sections: [
                {
                    sectionNumber: '24',
                    content: 'The consolidate accounts of the Association fund shall be audited by the recognized Charter Accountants. However, the fund of the District, Zonal Committee and the fund of the Branch Committee shall be audited by the Central, District and Zonal Committees respectively. There shall be an Audit Committee in Central, Regional, District and Zonal level consisting of 3 (three) members to audit the fund of the immediate subordinate committees.'
                }
            ]
        },
        {
            _id: '25',
            articleNumber: 25,
            title: 'SAFE CUSTODY OF FUNDS',
            sections: [
                {
                    sectionNumber: '25',
                    content: 'The Executive Committee of the Association shall be responsible for the safe custody of the Association Fund. Funds and assets of the association shall be kept in a government recognized bank under the joint account of the President, General Secretary and the Treasurer in favor of the association. If there is no bank within a radius of 3 km from the office of the association, the Executive Committee shall keep the fund with the Treasurer.'
                }
            ]
        },
        {
            _id: '26',
            articleNumber: 26,
            title: 'FINANCIAL POWER OF THE PRESIDENT AND THE GENERAL SECRETARY',
            sections: [
                {
                    sectionNumber: '26',
                    content: 'The President, Vice-President and the General Secretary shall have the competence to keep a sum of not more than 10,000/- in cash in their possession for emergency expenditure and such expenditure shall be discussed in the next meeting of the executive committee for approval. Provided that, the Zonal, Branch and Unit President, Vice-President and the General Secretary may keep a sum not exceeding Rs. 5,000/-, 2500/- and 2000 respectively for emergency expenditure.'
                }
            ]
        },
        {
            _id: '27',
            articleNumber: 27,
            title: 'ACCOUNTING OR FINANCIAL YEAR',
            sections: [
                {
                    sectionNumber: '27',
                    content: 'The accounting or financial year of the association shall be from 1st April to 31st March of the next year.'
                }
            ]
        },
        {
            _id: '28',
            articleNumber: 28,
            title: 'ELECTION COMMITTEE',
            sections: [
                {
                    sectionNumber: '28',
                    content: 'There shall be an Election Committee in Central, Regional (in the States other than Mizoram), District and Zonal level namely Central Election Committee, Regional Election Committee, District Election Committee and Zonal Election Committee consisting of one Chairman, one Vice-Chairman, one Secretary and two other'
                }
            ]
        },
        {
            _id: '29',
            articleNumber: 29,
            title: 'POWERS AND FUNCTIONS OF THE ELECTION COMMITTEE',
            sections: [
                {
                    sectionNumber: '29(1)',
                    content: 'The Central Election Committee is empowered to conduct Regional and District level Committees’ election, the District Election Committee is empowered to conduct Zonal Level election and the Zonal Election Committee is empowered to conduct Branch Committees’ election. However, the Central Advisory Board shall conduct the Election to the Central Executive Committee in consultation with the present Central Executive Committee. The Advisory Board shall appoint Returning Officer and other Polling Officials either from among the Advisors or any person having electioneering knowledge and experience.'
                },
                {
                    sectionNumber: '29(2)',
                    content: 'It shall notify the date of election in consultation with the concern Executive Committee.'
                },
                {
                    sectionNumber: '29(3)',
                    content: 'It may appoint any member/ members as Returning officers, Presiding officers and Polling officers to conduct an election or bye election at any level.'
                },
                {
                    sectionNumber: '29(4)',
                    content: 'It shall prepare an electoral roll as per provision.'
                },
                {
                    sectionNumber: '29(5)',
                    content: 'It shall be responsible for declaration of all election results with information to all concerned authorities.'
                },
                {
                    sectionNumber: '29(6)',
                    content: 'The Returning Officer shall issue Election Certificate to all the elected members.'
                },
                {
                    sectionNumber: '29(7)',
                    content: 'Nomination of all candidates shall be scrutinized on the time and date as notified by the Returning Officer keeping in view whether the candidate fulfill all the provision of these rule. Candidate would not be rejected on mere reasonable ground.'
                }
            ]
        },
        {
            _id: '30',
            articleNumber: 30,
            title: 'TENURE OF THE ELECTION COMMITTEE',
            sections: [
                {
                    sectionNumber: '30',
                    content: 'The tenure of the Election Committees shall be three (3) years from the date of appointment.'
                }
            ]
        },
        {
            _id: '31',
            articleNumber: 31,
            title: 'ELECTION PROCEDURE',
            sections: [
                {
                    sectionNumber: '31(1)',
                    content: 'A committee member of own setup, shall first propose the nomination of a candidate that nomination be seconded by another member shall remain valid.'
                },
                {
                    sectionNumber: '31(2)',
                    content: 'There shall be prescribed form of nominations paper as envisaged in ANNEXURE-III.'
                },
                {
                    sectionNumber: '31(3)',
                    content: 'The nomination paper should be submitted before the Returning Officer at least 24 hours before the commencement of the scrutiny.'
                },
                {
                    sectionNumber: '31(4)',
                    content: 'There shall be surety made by each candidate and shall be deposited to the Returning officer along with submission of nomination of his/her candidature. The amount of surety to be made by the candidate shall be decided or forfeited by the Central Executive Committee.'
                },
                {
                    sectionNumber: '31(5)',
                    content: 'If voting is conducted by ballot, it should be in secret.'
                },
                {
                    sectionNumber: '31(6)',
                    content: 'The General Election of any level executive committees may be conducted by raising hand or by secret ballot with not less than 30 days prior notice to all members of the particular committee.'
                },
                {
                    sectionNumber: '31(7)',
                    content: 'A general election shall be conducted on or before the expiry of the tenure of an executive committee.'
                },
                {
                    sectionNumber: '31(8)',
                    content: 'In all level elections, the President, the Vice-President (s), the General Secretary and the Treasurer only shall be elected. A candidate contesting for a particular post shall be barred from contesting for other posts. The remaining Office-Bearers and the Executive Members shall be selected from the electorates enrolled in the concern Electoral Roll by the five/four elected members and form the Executive Committee.'
                },
                {
                    sectionNumber: '31(9)',
                    content: 'Midterm election or bye election shall be held when the executive committee is suspended or dissolve or vacancy has been occurred due to resignation or removal or disqualification or otherwise as the case may be for the term of the committee concerned.'
                },
                {
                    sectionNumber: '31(10)',
                    content: '10. If one-fourth (1/4) of the total number of member have fallen vacant due to resignation, removal or otherwise including one elected members, the Executive Committee may induct any member by nomination to fill up such posts and reconstitute the Executive Committee. However, if 2/3 of the members including 3 elected members resigned, the Executive Committee is automatically dissolved. Provided that the superior committee may verify the cause of such resignation and if it satisfies with the reason, the concern Election Committee may initiate for fresh election.'
                },
                {
                    sectionNumber: '31(11)',
                    label: 'Deleted',
                    content: 'Deleted'
                },
                {
                    sectionNumber: '31(12)',
                    content: 'If the number of candidate to a particular post is one, then the Returning Officer shall forthwith declare those candidates elected uncontested.'
                },
                {
                    sectionNumber: '31(13)',
                    content: 'In case of draw of vote, it shall be decided by lottery.'
                }
            ]
        },
        {
            _id: '32',
            articleNumber: 32,
            title: 'QUALIFICATION TO BE A CANDIDATE',
            sections: [
                {
                    sectionNumber: '32(2)',
                    content: 'To be a candidate in the Central Executive Committee and Regional Committee one must attain 25 years of age. Similarly, 21 year and 18 years at the Zonal Executive Committee and Branch Executive Committee election respectively. However, a candidate for the elected posts in the Central Executive Committee must be a graduate. He/ she must be an illegible voter enrolled in the concerned electoral roll.'
                },
                {
                    sectionNumber: '32(3)',
                    content: 'If the intending candidate is held from a lower level committee, he/she should produce the recommendation of the immediate subordinate Executive Committee in support of his/her candidature during submission of his/ her nomination paper.'
                }
            ]
        },
        {
            _id: '33',
            articleNumber: 33,
            title: 'OATH TAKING',
            sections: [
                {
                    sectionNumber: '33',
                    content: 'All the new Office Bearers in each level shall be sworn in Office after oath taking ceremony ANNEXURE-IV. The outgoing Executive Committee shall handover the charge including properties and assets of the Association to the new Executive Committee in this ceremony.'
                }
            ]
        },
        {
            _id: '34',
            articleNumber: 34,
            title: 'ELECTORAL ROLL',
            sections: [
                {
                    sectionNumber: '34',
                    content: 'To conduct an election of all level Executive Committee, an electoral roll shall be prepared by the concern Election Committee showing; Serial No., Name, Father’s Name, Age, Sex as envisaged in sub-section 4 of section 29 in this constitution as envisaged in ANNEXURE-V.'
                }
            ]
        },
        {
            _id: '35',
            articleNumber: 35,
            title: 'VOTERS',
            sections: [
                {
                    sectionNumber: '35(1)',
                    label: 'Central Executive Committee Election',
                    content: 'All members of the existing Central Executive Committee, the office bearers of Regional Headquarters, District and Zonal Executive Committee, the President, Vice President, General Secretary and Treasurer of the Branch Executive Committee and all Donor Members shall be the electors and contest the election to the Central Executive Committee.'
                },
                {
                    sectionNumber: '35(2)',
                    label: 'Regional Headquarters Executive Committee Election',
                    content: 'All members of the Regional Headquarters Executive Committee, the Office Bearers of District, Zonal Executive Committee, all Donor members and the President, Vice President, General Secretary and Treasurer of the Branch Executive Committee shall be the electors and contest the election to the Regional Headquarters Executive Committee.'
                },
                {
                    sectionNumber: '35(3)',
                    label: 'District Executive Committee Election',
                    content: 'All members of the District Executive Committee, all office bearers of Zonal Executive Committee, Donor members and the President, Vice-President, General Secretary and Treasurer of the Branch Executive Committee shall be the electors and contest the election to the Zonal Executive Committee.'
                },
                {
                    sectionNumber: '35(4)',
                    label: 'Zonal Executive Committee Election',
                    content: 'All members of the Zonal Executive Committee, all Donor members and the Office Bearers of the Branch Executive Committee shall be the electors and contest the election to the Zonal Executive Committee.'
                },
                {
                    sectionNumber: '35(5)',
                    label: 'Branch Executive Committee Election',
                    content: 'All members of the Branch Executive Committee, all primary members of the Branch, Donor members shall be the electors and contest the election to the Branch Executive Committee.'
                },
                {
                    sectionNumber: '35(6)',
                    label: 'Deleted',
                    content: 'Deleted'
                }
            ]
        },
        {
            _id: '36',
            articleNumber: 36,
            title: 'ADVISORS',
            sections: [
                {
                    sectionNumber: '36',
                    content: 'All the Executive Committee of the Association shall have advisor or advisors to advise the Executive Committees from time to time. They shall be nominated by the Executive Committees for a period of the tenure as envisaged in the respective committee from amongst honourable and learned members of the society. The total number of members as follows:\n1. Central Executive Committee - 5\n2. Regional Executive Committee - 5\n2.a. District Executive Committee - 5\n3. Zonal Executive Committee - 4\n4. Branch Executive Committee - 3\n5. Unit Executive Committee - 2'
                }
            ]
        },
        {
            _id: '37',
            articleNumber: 37,
            title: 'FUNCTION OF A DISSOLVED COMMITTEE',
            sections: [
                {
                    sectionNumber: '37',
                    content: 'The President of the Association shall decide as to who shall assume the Executive Functions of a dissolved committee.'
                }
            ]
        },
        {
            _id: '38',
            articleNumber: 38,
            title: 'SUCCESSION',
            sections: [
                {
                    sectionNumber: '38',
                    content: 'The Association shall have a perpetual succession and common name and seal. It shall sue and be sued in the same name.'
                }
            ]
        },
        {
            _id: '39',
            articleNumber: 39,
            title: 'LIQUIDATION',
            sections: [
                {
                    sectionNumber: '39(1)',
                    content: 'The Central Executive Committee may in a General Meeting decide to liquidate the Association by passing a resolution by not less than 3/4 of the members present. Provided that, such a general meeting shall be called on at least 30 days notice to all Executive Committee of the Association.'
                },
                {
                    sectionNumber: '39(2)',
                    content: 'When the Association is liquidated, the asset of the Association shall be made over to similar organizations or other social or religious body.'
                }
            ]
        },
        {
            _id: '40',
            articleNumber: 40,
            title: 'FLAG AND SYMBOL',
            sections: [
                {
                    sectionNumber: '40(1)',
                    content: 'The flag of the Association shall be of three colours consisting the “WHITE” at the top, “GREEN” at the middle and “RED” at the bottom in equal shapes. The breadth of the flag shall be two-third of the length as shown in the ANNEXURE-VI.',
                    annexure: 'ANNEXURE-VI',
                    subAnnexure: 'u/s 40 (1)',
                    description: 'The colour of the flag denotes:\n(a) WHITE - Peace, tolerance and purity;\n(b) GREEN - Resource and development;\n(c) RED - Strictness, spirit and discipline.\n\nmeasuring height 10 inch each and wide 40 inch',
                    hasFlagVideo: true
                },
                {
                    sectionNumber: '40(2)',
                    label: 'SYMBOL',
                    content: 'The Association adopts the burning lamp as its symbol to represent its aims to eliminate the ignorant, illiteracy and superstition from the people and also to provide light of knowledge, education and development, etc.',
                    annexure: 'ANNEXURE-VII',
                    subAnnexure: 'u/s 40(2)',
                    hasSymbol: true
                }
            ]
        },
        {
            _id: '41',
            articleNumber: 41,
            title: 'SCOPE OF AMENDMENT',
            sections: [
                {
                    sectionNumber: '41',
                    content: 'This Constitution may be amended by the Central Committee in a General Meeting from time to time.'
                }
            ]
        }
    ];

    const categories = [
        { id: 'foundational', title: 'Foundational', icon: 'auto_stories', articles: ['preamble', 'memorandum', '1', '2', '40', '41'] },
        { id: 'membership', title: 'Membership', icon: 'person_add', articles: ['3', '4', '5', '6'] },
        { id: 'organization', title: 'Organization', icon: 'account_tree', articles: ['7', '9', '11', '14', '15'] },
        { id: 'powers', title: 'Powers & Duties', icon: 'gavel', articles: ['16', '17', '17(a)', '18', '19', '21'] },
        { id: 'meetings', title: 'Meetings', icon: 'groups', articles: ['8', '10', '22'] },
        { id: 'admin', title: 'Administration', icon: 'admin_panel_settings', articles: ['12', '13'] },
        { id: 'finance', title: 'Finance & Audit', icon: 'payments', articles: ['23', '24', '25', '26', '27'] },
        { id: 'elections', title: 'Elections', icon: 'how_to_reg', articles: ['28', '29', '30', '31'] }
    ];

    useEffect(() => {
        const fetchBylaws = async () => {
            try {
                const response = await bylawsAPI.getAll();
                if (response.success && response.data.length > 0) {
                    setArticles(response.data);
                } else {
                    setArticles(FALLBACK_ARTICLES);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setArticles(FALLBACK_ARTICLES);
            } finally {
                setLoading(false);
            }
        };
        fetchBylaws();
    }, []);

    useEffect(() => {
        let sectionOffsets = [];
        const updateOffsets = () => {
            const sections = document.querySelectorAll('section[id^="art-"]');
            sectionOffsets = Array.from(sections).map(s => ({
                id: s.getAttribute('id'),
                top: s.offsetTop - 150
            }));
        };

        const handleScroll = () => {
            if (sectionOffsets.length === 0) updateOffsets();
            let current = '';
            const scrollPos = window.scrollY + 160;

            for (const section of sectionOffsets) {
                if (scrollPos >= section.top) {
                    current = section.id;
                } else {
                    break;
                }
            }

            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
                if (articles.length > 0) {
                    current = `art-${articles[articles.length - 1].articleNumber}`;
                }
            }
            setActiveArticle(prev => prev !== current ? current : prev);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateOffsets);
        updateOffsets();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateOffsets);
        };
    }, [articles, loading]);

    useEffect(() => {
        if (activeArticle && articles.length > 0) {
            const activeLink = document.getElementById(`link-${activeArticle}`);
            const sidebarContainer = document.getElementById('sidebar-index-container');
            if (activeLink && sidebarContainer) {
                const containerRect = sidebarContainer.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();

                // Use 'auto' instead of 'smooth' for the sidebar internal scroll to prevent window-level scroll fighting
                if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
                    activeLink.scrollIntoView({ behavior: 'auto', block: 'nearest' });
                }
            }
        }
    }, [activeArticle, articles.length]);

    const filteredArticles = useMemo(() => articles.filter(art => {
        const searchLower = search.toLowerCase();
        const numberMatch = art.articleNumber.toString() === searchLower.replace('article', '').trim();
        return art.title.toLowerCase().includes(searchLower) ||
            art.sections.some(s => s.content.toLowerCase().includes(searchLower)) ||
            numberMatch;
    }), [articles, search]);

    return (
        <div className="bg-[#fcfdfc] dark:bg-slate-950 min-h-screen">
            {/* Reading Progress */}
            <div className="fixed top-0 left-0 right-0 h-1.5 bg-gray-100 dark:bg-white/5 z-[100]">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${loading ? 0 : 30}%` }}
                ></div>
            </div>

            <div className="container mx-auto px-4 py-8 md:py-20 lg:py-32">
                {/* Modern Hero */}
                <header className="max-w-4xl mb-24 space-y-8">
                    <div className="flex items-center gap-4 text-accent font-black uppercase tracking-[0.4em] text-xs">
                        <span className="material-symbols-outlined text-lg">policy</span>
                        The Legal Foundation
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-primary leading-tight">
                        Memorandum & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient">Constitution</span>
                    </h1>
                    <p className="text-xl font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                        The supreme governing document of the Young Chakma Association, revised 2018. Explore the laws, rights, and principles that define our unity.
                    </p>

                    {/* Search Bar Refined */}
                    <div className="relative group max-w-2xl pt-8">
                        <span className="absolute left-6 top-[calc(50%+16px)] -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-accent transition-colors z-10">search_check</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-20 pl-16 pr-8 rounded-[2rem] bg-white dark:bg-white/5 border-2 border-primary/10 shadow-2xl outline-none focus:ring-8 focus:ring-accent/10 focus:border-accent transition-all font-bold text-lg text-primary"
                            placeholder="Find specific articles or sections..."
                        />
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Categorical Sidebar */}
                    <aside className="w-full lg:w-1/4 hidden lg:block">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-primary/10 shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 size-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-8 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">list_alt</span>
                                    Constitution Index
                                </h3>

                                <div id="sidebar-index-container" className="space-y-10 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="space-y-4">
                                            <div className="flex items-center gap-2 px-2 text-[10px] font-black uppercase text-accent tracking-widest">
                                                <span className="material-symbols-outlined text-xs">{cat.icon}</span>
                                                {cat.title}
                                            </div>
                                            <div className="grid gap-1">
                                                {cat.articles.map(artNum => {
                                                    const art = articles.find(a => a.articleNumber.toString() === artNum.toString() || (artNum === 'preamble' && a.articleNumber === 0));
                                                    if (!art) return null;
                                                    const isActive = activeArticle === `art-${art.articleNumber}`;
                                                    return (
                                                        <a
                                                            key={art._id}
                                                            id={`link-art-${art.articleNumber}`}
                                                            href={`#art-${art.articleNumber}`}
                                                            className={`group flex items-center justify-between p-3 rounded-2xl transition-all border ${isActive ? 'bg-primary border-primary text-white shadow-lg' : 'hover:bg-primary/5 border-transparent text-slate-600 dark:text-slate-400 hover:text-primary'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className={`text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-lg ${isActive ? 'bg-white/20' : 'bg-primary/10'}`}>
                                                                    {art.articleNumber === 0 ? 'P' : art.articleNumber === 'M' ? 'M' : art.articleNumber}
                                                                </span>
                                                                <span className="text-[11px] font-black uppercase tracking-tight truncate max-w-[120px]">
                                                                    {art.title.length > 20 ? art.title.substring(0, 20) + '...' : art.title}
                                                                </span>
                                                            </div>
                                                            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Shortcut FAB could go here, but this is desktop aside */}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="w-full lg:w-3/4">
                        <div className="space-y-40">
                            {loading ? (
                                <div className="space-y-20 animate-pulse">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="space-y-6">
                                            <div className="h-12 bg-gray-100 dark:bg-white/5 rounded-2xl w-1/3"></div>
                                            <div className="h-64 bg-gray-100 dark:bg-white/5 rounded-[3rem]"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                filteredArticles.map((art, artIdx) => (
                                    <section
                                        key={art._id}
                                        id={`art-${art.articleNumber}`}
                                        className="scroll-mt-40 group/article"
                                    >
                                        {/* Article Modern Header */}
                                        <div className="mb-16 relative">
                                            <div className="absolute -left-20 top-0 text-[12rem] font-black text-primary/5 select-none pointer-events-none group-hover/article:text-accent/10 transition-colors duration-1000">
                                                {art.articleNumber === 'M' ? 'M' : art.articleNumber === 0 ? 'P' : art.articleNumber}
                                            </div>
                                            <div className="relative z-10 flex flex-col gap-4">
                                                <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">
                                                    {art.articleNumber === 0 ? 'Preamble' : art.articleNumber === 'M' ? 'Memorandum' : `Article ${art.articleNumber}`}
                                                </span>
                                                <h2 className="text-4xl md:text-5xl font-black text-primary uppercase leading-tight">
                                                    {art.title}
                                                </h2>
                                                <div className="h-2 w-32 bg-primary group-hover/article:w-48 transition-all duration-700 rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* Sections Grid/Stack */}
                                        <div className="grid gap-12">
                                            {art.sections.map((sec, i) => (
                                                <div
                                                    key={i}
                                                    className={`p-10 md:p-16 rounded-[4rem] bg-white dark:bg-white/5 border border-primary/5 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-primary/20 ${sec.content === 'Deleted' ? 'opacity-30 scale-95 grayscale' : ''}`}
                                                >
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                                        <div className="flex items-center gap-4">
                                                            <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">
                                                                {sec.sectionNumber}
                                                            </div>
                                                            <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{sec.label || 'Clause'}</h4>
                                                        </div>
                                                        {sec.content !== 'Deleted' && (
                                                            <button
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(`${art.title} - Section ${sec.sectionNumber}: ${sec.content}`);
                                                                    alert('Copied specific section to clipboard');
                                                                }}
                                                                className="size-10 rounded-full border border-primary/10 flex items-center justify-center text-primary/40 hover:bg-primary hover:text-white transition-all"
                                                                title="Share this section"
                                                            >
                                                                <span className="material-symbols-outlined text-sm">share</span>
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="prose prose-xl prose-slate max-w-none">
                                                        <p className="text-xl md:text-2xl font-medium leading-[1.8] text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
                                                            {sec.content}
                                                        </p>
                                                    </div>

                                                    {sec.hasFlagVideo && <FlagAnimation />}
                                                    {sec.hasSymbol && (
                                                        <div className="flex justify-center my-16">
                                                            <div className="relative size-64 md:size-80 rounded-full overflow-hidden shadow-2xl border-8 border-primary/10 bg-white p-4 animate-float">
                                                                <img src="/assets/ycalogo.png" alt="YCA Logo" className="w-full h-full object-contain" />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {sec.members && (
                                                        <div className="mt-16 overflow-hidden rounded-[3rem] border border-primary/10 shadow-inner bg-gray-50/50 dark:bg-black/20">
                                                            <div className="overflow-x-auto">
                                                                <table className="w-full text-left border-collapse">
                                                                    <thead>
                                                                        <tr className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em]">
                                                                            <th className="px-10 py-6">ID</th>
                                                                            <th className="px-10 py-6">Name</th>
                                                                            <th className="px-10 py-6">Occupation</th>
                                                                            <th className="px-10 py-6 text-right">Role</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {sec.members.map((m, idx) => (
                                                                            <tr key={idx} className="border-b border-primary/5 hover:bg-white dark:hover:bg-white/5 transition-colors">
                                                                                <td className="px-10 py-6 font-mono text-xs text-slate-400 dark:text-slate-500">{idx + 1}</td>
                                                                                <td className="px-10 py-6 font-black text-slate-800 dark:text-slate-100 uppercase text-sm">{m.name}</td>
                                                                                <td className="px-10 py-6 text-xs font-medium text-slate-500 dark:text-slate-400 italic">{m.occupation || 'Cultural Ambassador'}</td>
                                                                                <td className="px-10 py-6 text-right">
                                                                                    <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent font-black text-[10px] uppercase shadow-sm">
                                                                                        {m.designation}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))
                            )}

                            {!loading && filteredArticles.length === 0 && (
                                <div className="text-center py-40 animate-fade-in">
                                    <span className="material-symbols-outlined text-8xl text-primary/10 mb-8">search_off</span>
                                    <h3 className="text-3xl font-black text-primary/40 italic">No articles match "{search}"</h3>
                                    <button onClick={() => setSearch('')} className="mt-8 text-accent font-black uppercase tracking-widest border-b-2 border-accent">Clear Results</button>
                                </div>
                            )}
                        </div>

                        {/* Legal CTA */}
                        <div className="mt-60 p-16 md:p-24 rounded-[5rem] bg-primary text-white relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,122,51,0.3)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative z-10 grid lg:grid-cols-5 gap-16 items-center">
                                <div className="lg:col-span-3 space-y-10 text-center lg:text-left">
                                    <div className="inline-flex size-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                                        <span className="material-symbols-outlined text-4xl">balance</span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-4xl md:text-6xl font-black">Need Clarification?</h3>
                                        <p className="text-xl opacity-70 leading-relaxed font-medium">
                                            The constitution is a living document. For interpretations, legal appeals or formal amendments, engage with our central executive committee.
                                        </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start">
                                        <Link href="/contact" className="px-12 py-6 bg-white text-primary font-black rounded-3xl hover:bg-accent hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 leading-none">
                                            Contact Legal Dept
                                            <span className="material-symbols-outlined text-sm">mail</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 hidden lg:block">
                                    <div className="relative aspect-square rounded-[3rem] bg-white/5 border border-white/10 p-10 rotate-3 group-hover:rotate-0 transition-transform duration-700">
                                        <img src="/assets/ycalogo.png" alt="YCA symbol" className="w-full h-full object-contain opacity-20 grayscale brightness-200" />
                                        <div className="absolute inset-x-0 bottom-10 text-center">
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">DO HELP</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile TOC Scroller (Horizontal Bottom Bar) */}
            <div className="lg:hidden fixed bottom-8 left-4 right-4 z-[90]">
                <div className="bg-primary/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-4 flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
                    {categories.map(cat => (
                        <a
                            key={cat.id}
                            href={`#art-${articles.find(a => cat.articles.includes(a.articleNumber.toString()) || (cat.articles.includes('preamble') && a.articleNumber === 0))?.articleNumber || ''}`}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 text-white whitespace-nowrap snap-center border border-white/10"
                        >
                            <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{cat.title}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
