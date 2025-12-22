import { Trans } from '@lingui/react/macro';
import { Link } from 'react-router';

import { Button } from 'src/components/ui/button';

export function Home() {
  return (
    <div className="col flex-1 items-center justify-center">
      <Button asChild size="lg">
        <Link to="/session/new">
          <Trans>New session</Trans>
        </Link>
      </Button>
    </div>
  );
}
