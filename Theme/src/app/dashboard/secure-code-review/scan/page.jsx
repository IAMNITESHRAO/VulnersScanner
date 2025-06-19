import React from 'react'
import PageContainer from '@/app/components/container/PageContainer'
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb'

export default function Scan() {
    return (
        <>
            <PageContainer title="Scan" description="this is scan">
                <Breadcrumb title="Scan" subtitle="List of all scan" />
            </PageContainer>
        </>
    )
}