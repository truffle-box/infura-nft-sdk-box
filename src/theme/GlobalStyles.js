import { createGlobalStyle } from "styled-components";
import { transparentize } from "polished";
import regular from "../assets/fonts/Euclid/EuclidCircularB-Regular-WebXL.ttf";
import bold from "../assets/fonts/Euclid/EuclidCircularB-Bold-WebXL.ttf";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Euclid';
    font-style: normal;
    font-weight: 400;
    src: url(${regular}) format('truetype');
  }

  @font-face {
    font-family: 'Euclid';
    font-style: normal;
    font-weight: 700;
    src: url(${bold}) format('truetype');
  }

	html {
		height: 100vh;
    font-family: "Euclid", serif;
	}

	body {
		margin: 0;
		padding: 0;
		position: relative;
		background-color: #E5E5E5;
		color: #24292E;
		font-family: 'Euclid', serif;
		width: 100vw;
		height: 100%;
		#root {
			position: relative;
			width: 100vw;
			display: grid;
			height: 100%;
			padding: 1em;
			box-sizing: border-box;
			overflow: scroll;
			grid-template-columns: 14vw auto;
			grid-template-rows: 80px auto auto;
			gap: 1em;
			grid-template-areas:
				"header header"
				"nav main"
				"nav footer";
			@media (min-width: 1500px) {
				grid-template-rows: 80px auto auto;
				grid-template-columns: 14vw auto;
				justify-items: stretch;
			}
		}
	}

	header {
		align-items: center;
		display: flex;
		align-self: start;
		background-color: #F2F4F6;
		grid-area: header;
		flex-direction: row;
		height: 80px;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		justify-content: space-between;
		width: 100%;
		padding: 0 0.25em;
		border-radius: 8px;
		box-sizing: border-box;
		> * { justify-self: end; }
		> img { height: 65px; }
		@media (min-width: 1200px) {
			/* The MetaMask image already has some padding so we can either use an
			   image with no padding or only add padding to the right of the header
			   padding: 0 2em; */
			padding-right: 1.5em;
			grid-template-columns: 14vw auto;
		}
	}

	footer {
		height: fit-content;
		box-sizing: border-box;
		border-radius: 8px;
		grid-area: footer;
		background-color: #F2F4F6;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		width: 100%;
		align-self: flex-end;
		display: grid;
		grid-template-areas:
			'brand brand brand'
			'help learn connect'
			'copyright copyright copyright';
		> img {
			height: 50px;
			grid-area: brand;
		}
		> p {
			margin-left: 1em;
			grid-area: copyright;
		}
		> div {
			display: flex;
			flex-direction: column;
		}
		> div:first-of-type {
			grid-area: help;
			margin-left: 1em;
		}
		> div:nth-of-type(2) {
			grid-area: learn;
		}
		> div:last-of-type {
			grid-area: connect;
		}
	}

	nav {
		height: 100%;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
		justify-self: center;
		padding: 1em;
    background: rgba(195, 169, 249, 0.5);
		align-self: stretch;
		box-sizing: border-box;
		grid-area: nav;
		border-radius: 8px;
		width: 14vw;
		@media (min-width: 1500px) {
			width: 14vw;
		}
	}
	main {
		grid-area: main;
		z-index: 10;
		width: 100%;
		justify-self: stretch;
		@media (min-width: 500px) {
			display: inline;
		}
	}

	form {
		fieldset {
			display: grid;
			width: 60%;
			border-color: transparent;
			padding: 1em;
			margin: 0 auto;
			grid-template-areas:
				'snapLink snapName'
				'githubLink offeredBy'
				'version website'
				'imgLink imgLink'
				'category category'
				'description description'
				'submit submit';
			gap: 2em;
			label {
				display: flex;
				flex-direction: column;
				height: fit-content;
				gap: 0.5em;
				p {
					padding: 0;
					margin: 0;
					span {
						color: ${transparentize(0.3, "#24292E")};
					}
				}
				input, textarea {
					background-color: #f2f4f6;
					box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
						rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
					border-radius: 4px;
					border: none;
					outline: none;
				}
				input {
					width: 300px;
					padding: 0.5em;
					font-size: 1.1em;
				}
				textarea {
				  resize: none;
					height: 150px;
					font-family: 'Euclid', serif;
					width: 100%;
				}
			}
			/*
				Marvelous, innit?
			*/
			label:first-of-type { grid-area: snapLink; }
			label:nth-of-type(2) { grid-area: snapName; }
			label:nth-of-type(3) { grid-area: githubLink; }
			label:nth-of-type(4) { grid-area: offeredBy; }
			label:nth-of-type(5) { grid-area: version; }
			label:nth-of-type(6) { grid-area: website; }
			label:nth-of-type(7) { grid-area: imgLink; }
			label:last-of-type { grid-area: description; }
		}
	}

	input[type="submit"], button {
		border: 1px solid #bbc0c5;
		cursor: pointer;
		background-color: #fff;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 12px 0px,
			rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		border-radius: 25px;
		padding: 0.75em 1em;
	}

	input[type="submit"] {
		background-color: #935DD7;
		font-size: 1.1em;
		color: #fff;
		grid-area: submit;
		width: fit-content;
		padding: 0.5em 2em;
		justify-self: end;
	}
`;

export default GlobalStyles;
