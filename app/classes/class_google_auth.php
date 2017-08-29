<?php
class GoogleAuth
{
    protected $client;
    
    public function __construct(Google_Client $googleClient = null) {
       
        $this->client = $googleClient;
        
        if($this->client) {
            //$this->client->setAuthConfig(__FILE__ + '/vendor/client_secret.json');
            $this->client->setClientId('749676999260-4d0lgk2go0iu7ft54eo3clu6mingv6jd.apps.googleusercontent.com');
            $this->client->setClientSecret('5ntcemikucmm6beGYbkWDJQ8');
            $this->client->setAccessType("offline");
            $this->client->setIncludeGrantedScopes(true);
            
            $this->client->addScope("https://www.googleapis.com/auth/drive");
            $this->client->setRedirectUri('http://localhost:8888/ArgumentDiagram');
        }
    }

    public function isLoggedIn() {
        return isset($_SESSION['access_token']);
    }

    public function getAuthUrl() {
        try {
            return $this->client->createAuthUrl();
        } catch (Exception $e) {
            echo "Exception! " , $e->getMessage() , "\n";
        }
        
    }
}

?>

