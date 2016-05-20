<?

// Prevent echo
ob_start();

include_once('teams.php');
include_once('cities.php');
include_once('regions.php');

ob_end_clean();

/**
 * 
 */
class Search
{        
    function __construct()
    {
        if (!empty($_POST['group'])) {
            if (!empty($_POST['term'])) {
                $group = trim(htmlspecialchars($_POST['group'], ENT_QUOTES, 'utf-8'));

                switch ($group) {
                    case 'team':
                        $this->group = $teamsarray;
                        break;

                    case 'city':
                        $this->group = $citiesarray;
                        break;

                    case 'region':
                        $this->group = $regionsarray;
                        break;

                    default:
                        $this->group = $teamsarray;
                        break;
                }

                $this->term = trim(htmlspecialchars($_POST['term'], ENT_QUOTES, 'utf-8'));
            } else {
                $this->output('No search term');
            }
        } else {
            $this->output('No group selected');
        }
    }
    
    // Escaped output
    protected function output($output_term, $isJson = false)
    {
        if ($isJson === true) {
            echo json_encode($output_term);
        } else {
            echo htmlspecialchars($output_term, ENT_QUOTES, 'utf-8');
        }
    }
    
    // Search engine logic
    public function search()
    {
        $matches = preg_grep($this->term, $this->group);
        
        $this->output($matches, true);
    }
}

$Search = new Search();
$Search->search();