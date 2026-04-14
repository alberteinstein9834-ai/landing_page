import React from "react";
import img1 from "../assets/images2.png";

const Home = () => {
  return (
    <React.Fragment>
      <div className="">
        <nav
          class="navbar navbar-expand-lg bg-body-tertiary "
          data-bs-theme="dark"
        >
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Navbar
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <span class="nav-link active" aria-current="page" >
                    Home
                  </span>
                </li>
                <li class="nav-item">
                  <span class="nav-link" >
                    Link
                  </span>
                </li>
                <li class="nav-item dropdown">
                  <span
                    class="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </span>
                  <ul class="dropdown-menu">
                    <li>
                      <span class="dropdown-item" >
                        Action
                      </span>
                    </li>
                    <li>
                      <span class="dropdown-item" >
                        Another action
                      </span>
                    </li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li>
                      <span class="dropdown-item" >
                        Something else here
                      </span>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <span class="nav-link disabled" aria-disabled="true">
                    Disabled
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* carousel */}

    <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={img1} class="d-block w-100" alt="..." height={600}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={img1} class="d-block w-100" alt="..." height={600}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={img1} class="d-block w-100" alt="..." height={600}/>
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    {/* about us */}

    <div className="container mt-5">
         <h1 className="text-center mt-5">About Us</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do e
            iusmod tempor incididunt ut labore et dolore magna aliqualksahfdoiasf.kjdsyflzdsf\jshdusgdaskgdul\s
            dsusydskjsaidsadwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
            dosaudsakisaudksajwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdoi.</p>
    </div>


    {/* portfolio */}
    <div className="container-fluid mt-5">
         <h1 className="text-center mt-5">Portfolio</h1>
         <div className="d-flex flex-wrap justify-content-center">
            <img className="m-5" src={img1} alt="Project 1" height={200}/>
            <img className="m-5" src={img1} alt="Project 1" height={200}/>
            <img className="m-5" src={img1} alt="Project 1" height={200}/>
            <img className="m-5" src={img1} alt="Project 1" height={200}/>
            <img className="m-5" src={img1} alt="Project 1" height={200}/>
            <img className="m-5" src={img1} alt="Project 1" height={200}/>
         </div>
         
    </div>

    {/* Services */}
    <div className="container mt-6">
        <h1 className="text-center mt-5">Services</h1>
        CSS
  <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '25%',  backgroundColor: 'yellow' }}> <span style={{  color: 'black' }}> html</span></div>
  </div>
  <br />
  HTML
 <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '55%',  backgroundColor: 'red' }}></div>
  </div>
  <br />
  JS
  <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '75%',  backgroundColor: 'pink' }}></div>
  </div>
  <br />
  REACT JS
  <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '95%',  backgroundColor: 'green' }}></div>
  </div>
  <br />
  BOOTSTRAP
  <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%',  backgroundColor: 'brown' }}></div>
  </div>
</div>
<br />

   {/* CONTACT US  */}

    <div className="container mt-6">
          <h1 className="text-center mt-5">Contact Us</h1>
    <form>
      <div class="mb-3">
    <label for="exampleInputText1" class="form-label">Username:</label>
    <input type="Text" class="form-control" id="exampleInputText1" aria-describedby="TextHelp"/>
    <div id="TextHelp" class="form-text">We'll never share your Username with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>

  {/* <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div> */}
  <div class="form-floating">
  <textarea class="form-control" placeholder="Leave a Message here" id="floatingTextarea" style={{height: 100}}></textarea>
  <label for="floatingTextarea">Message</label>
</div>

  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        
    </div>

    {/* bottom bar */}

    <footer className="d-flex p-5 bg-dark justify-content-around " data-bs-theme="dark" >
    <div className="card">
      <h2>Links</h2>
      <ul>
        <li>data 1</li>
        <li>data 2</li>
        <li>data 3</li>
        <li>data 4</li>
      </ul>

    </div>
    <div className="card">
      <h2>Views</h2>
      <ul>
        <li>data 1</li>
        <li>data 2</li>
        <li>data 3</li>
        <li>data 4</li>
      </ul>
    </div>
    <div className="card">
      <h2>Brands</h2>
      <ul>
        <li>data 1</li>
        <li>data 2</li>
        <li>data 3</li>
        <li>data 4</li>
      </ul>
    </div>

    </footer>

      </div>
    </React.Fragment>
  );
};

export default Home;
