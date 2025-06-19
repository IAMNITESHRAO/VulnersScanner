import { uniqueId } from 'lodash';

import { IconAperture, IconBrandStorj, IconCirclesRelation, IconCode, IconFileInvoice, IconPoint, IconPointFilled, IconReport, IconShieldSearch } from '@tabler/icons-react';
import { IconCloud } from '@tabler/icons-react';
import { IconDeer } from '@tabler/icons-react';
import { IconHexagon3d } from '@tabler/icons-react';
import { IconEyeCode } from '@tabler/icons-react';
import { IconUserCog } from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/dashboard',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Cloud Scan',
    icon: IconCloud,
    href: '/dashboard/cloud-scan/',
    children: [
      {
        id: uniqueId(),
        title: 'Asset Management',
        icon: IconUserCog,
        href: '/dashboard/cloud-scan/asset-management',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Secure Code Review',
    icon: IconCode,
    href: '/dashboard/secure-code-review/',
    children: [
      {
        id: uniqueId(),
        title: 'Snyk',
        icon: IconDeer,
        href: '/dashboard/secure-code-review/snyk',
      },
      {
        id: uniqueId(),
        title: 'Semgrep',
        icon: IconCirclesRelation,
        href: '/dashboard/secure-code-review/semgrep',
      },
      {
        id: uniqueId(),
        title: 'Scan',
        icon: IconShieldSearch,
        href: '/dashboard/secure-code-review/scan',
      },
      {
        id: uniqueId(),
        title: 'Reports',
        icon: IconReport,
        href: '/dashboard/secure-code-review/reports',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'VA',
    icon: IconFileInvoice,
    href: '/dashboard/va/',
    children: [
      {
        id: uniqueId(),
        title: 'Nessus',
        icon: IconBrandStorj,
        href: '/dashboard/va/nessus',
      },
      {
        id: uniqueId(),
        title: 'nMap',
        icon: IconEyeCode,
        href: '/dashboard/va/nMap',
      },
    ],
  },
      {
        id: uniqueId(),
        title: 'Project Management',
        icon: IconBrandStorj,
        href: '/dashboard/project-management/',
        children: [
          {
        id: uniqueId(),
        title: 'Project List',
        icon: IconPointFilled,
        href: '/dashboard/reporting-tool/project-list/',
      },
          {
        id: uniqueId(),
        title: 'Project Test',
        icon: IconEyeCode,
        href: '/dashboard/reporting-tool/project-management/project-test',
        children: [
          {
        id: uniqueId(),
        title: 'Edit1.0 ',
        icon: IconPointFilled,
        href: '/dashboard/reporting-tool/project-management/project-test',
      },
        ]
      },
      {
        id: uniqueId(),
        title: 'Project Test 2',
        icon: IconEyeCode,
        href: '/dashboard/reporting-tool/project-management/project-list/',
        children: [
          {
        id: uniqueId(),
        title: 'Edit1.0 ',
        icon: IconPointFilled,
        href: '/dashboard/reporting-tool/project-management/project-test2',
      },
        ]
      },
      {
        id: uniqueId(),
        title: 'IBM VA',
        icon: IconEyeCode,
        href: '/dashboard/reporting-tool/project-management/project-list/',
        children: [
          {
        id: uniqueId(),
        title: 'Edit1.0 ',
        icon: IconPointFilled,
        href: '/dashboard/reporting-tool/project-management/IBM-VA',
      },
        ]
      },
        ]
      },
];

export default Menuitems;