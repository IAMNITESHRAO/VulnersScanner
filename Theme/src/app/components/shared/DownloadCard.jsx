'use client'
import { Box, Card, CardHeader, Divider, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconDownload } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const DownloadCard = ({ title, children, onDownload, mb }) => {
    const customizer = useSelector((state) => state.customizer);

    const theme = useTheme();
    const borderColor = theme.palette.divider;

    return (
        <>
            <Card
                sx={{ padding: 0, marginBottom: mb, border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none' }}
                elevation={customizer.isCardShadow ? 9 : 0}
                variant={!customizer.isCardShadow ? 'outlined' : undefined}
            >
                <CardHeader
                    sx={{
                        padding: "2px 10px",
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
                        backgroundColor: theme.palette.primary.light,
                        '& .MuiCardHeader-title': {
                            fontSize: '0.875rem',
                        },
                    }}
                    title={<Box component="span">{title}</Box>}
                    action={
                        <>
                            {onDownload && (
                                <Tooltip title="Download" placement="left">
                                    <IconButton
                                        variant="contained"
                                        sx={{ fontSize: '.6rem' }}
                                        onClick={onDownload}
                                    >
                                        <IconDownload />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </>
                    }
                />
                <Divider />
                {children}
            </Card>

        </>
    );
};

DownloadCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    onDownload: PropTypes.func,
    mb: PropTypes.number,
};

export default DownloadCard;