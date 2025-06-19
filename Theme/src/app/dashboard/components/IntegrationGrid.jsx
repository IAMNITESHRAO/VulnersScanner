import {
    Box,
    Container,
    Grid,
    Link,
    Paper,
    Typography
} from '@mui/material';

import {
    IconBrandAws,
    IconBrandAzure,
    IconBrandBitbucket,
    IconBrandDocker,
    IconBrandGolang,
    IconBrandGoogle,
    IconBrandJavascript,
    IconBrandPhp,
    IconBrandPython,
    IconBrandReact,
    IconBrandRedux,
    IconBrandVisualStudio,
    IconFileTypeJsx,
    IconGizmo
} from '@tabler/icons-react';

const gridItems = [
  { row: 0, col: 0, icon: 'JS' },
  { row: 0, col: 1, icon: 'React' },
  { row: 0, col: 2, icon: 'Python' },
  { row: 0, col: 3, icon: 'PHP' },
  { row: 0, col: 4, icon: 'Go' },
  { row: 1, col: 4, icon: 'Eclipse' },
  { row: 1, col: 1, icon: 'Gradle' },
  { row: 1, col: 2, icon: 'VS' },
  { row: 1, col: 3, icon: 'Bitbucket' },
  { row: 2, col: 3, icon: 'Azure' },
  { row: 2, col: 4, icon: 'GCP' },
  { row: 2, col: 2, icon: 'IBM' },
  { row: 3, col: 3, icon: 'Docker' },
  { row: 3, col: 4, icon: 'Kubernetes' },
  { row: 4, col: 4, icon: 'Lighthouse' }
];

const iconMap = {
  JS: IconBrandJavascript,
  React: IconBrandReact,
  Python: IconBrandPython,
  PHP: IconBrandPhp,
  Go: IconBrandGolang,
  Eclipse: IconFileTypeJsx,
  Gradle: IconBrandRedux,
  VS: IconBrandVisualStudio,
  Bitbucket: IconBrandBitbucket,
  Azure: IconBrandAzure,
  GCP: IconBrandGoogle,
  IBM: IconGizmo,
  Docker: IconBrandDocker,
  Kubernetes: IconBrandAws,
  Lighthouse: IconBrandAzure
};

const rows = 5;
const cols = 5;

const IntegrationGrid = () => {
  return (
    <Box>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left Side: Heading and Description */}
        <Box sx={{ flex: 1, minWidth: 300, padding: 3 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ lineHeight: 1.2 }}>
            INTEGRATIONS FOR <br /> YOUR ENTIRE SDLC
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 500, mt: 2, mb: 3, fontSize: 16, lineHeight: 1.6 }}>
            Snyk seamlessly integrates with the most popular languages, platforms, and systems —
            so you can secure your code without disrupting the existing workflow.
          </Typography>
          <Link href="#" underline="hover" sx={{ color: '#0288d1', fontWeight: 500 }}>
            Explore all integrations and languages →
          </Link>
        </Box>

        {/* Right Side: Custom Icon Grid */}
        <Box sx={{ flex: 1, minWidth: 300, mt: { xs: 5, md: 0 }, paddingLeft: 25 }}>
          <Grid container spacing={1}>
            {[...Array(rows)].map((_, rowIndex) => (
              <Grid container item spacing={1} key={rowIndex}>
                {[...Array(cols)].map((_, colIndex) => {
                  const gridItem = gridItems.find(
                    (item) => item.row === rowIndex && item.col === colIndex
                  );
                  const IconComponent = gridItem ? iconMap[gridItem.icon] : null;

                  return (
                    <Grid item key={`${rowIndex}-${colIndex}`}>
                      {IconComponent ? (
                        <Paper
                          elevation={3}
                          sx={{
                            width: 56,
                            height: 56,
                            backgroundColor: '#1e1f3f',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1
                          }}
                        >
                          <IconComponent size={28} />
                        </Paper>
                      ) : (
                        <Box sx={{ width: 56, height: 56 }} />
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default IntegrationGrid;
