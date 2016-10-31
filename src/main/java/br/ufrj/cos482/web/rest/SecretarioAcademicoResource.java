package br.ufrj.cos482.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufrj.cos482.service.SecretarioAcademicoService;
import br.ufrj.cos482.web.rest.util.HeaderUtil;
import br.ufrj.cos482.service.dto.SecretarioAcademicoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing SecretarioAcademico.
 */
@RestController
@RequestMapping("/api")
public class SecretarioAcademicoResource {

    private final Logger log = LoggerFactory.getLogger(SecretarioAcademicoResource.class);
        
    @Inject
    private SecretarioAcademicoService secretarioAcademicoService;

    /**
     * POST  /secretario-academicos : Create a new secretarioAcademico.
     *
     * @param secretarioAcademicoDTO the secretarioAcademicoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new secretarioAcademicoDTO, or with status 400 (Bad Request) if the secretarioAcademico has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/secretario-academicos",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SecretarioAcademicoDTO> createSecretarioAcademico(@RequestBody SecretarioAcademicoDTO secretarioAcademicoDTO) throws URISyntaxException {
        log.debug("REST request to save SecretarioAcademico : {}", secretarioAcademicoDTO);
        if (secretarioAcademicoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("secretarioAcademico", "idexists", "A new secretarioAcademico cannot already have an ID")).body(null);
        }
        SecretarioAcademicoDTO result = secretarioAcademicoService.save(secretarioAcademicoDTO);
        return ResponseEntity.created(new URI("/api/secretario-academicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("secretarioAcademico", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /secretario-academicos : Updates an existing secretarioAcademico.
     *
     * @param secretarioAcademicoDTO the secretarioAcademicoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated secretarioAcademicoDTO,
     * or with status 400 (Bad Request) if the secretarioAcademicoDTO is not valid,
     * or with status 500 (Internal Server Error) if the secretarioAcademicoDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/secretario-academicos",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SecretarioAcademicoDTO> updateSecretarioAcademico(@RequestBody SecretarioAcademicoDTO secretarioAcademicoDTO) throws URISyntaxException {
        log.debug("REST request to update SecretarioAcademico : {}", secretarioAcademicoDTO);
        if (secretarioAcademicoDTO.getId() == null) {
            return createSecretarioAcademico(secretarioAcademicoDTO);
        }
        SecretarioAcademicoDTO result = secretarioAcademicoService.save(secretarioAcademicoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("secretarioAcademico", secretarioAcademicoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /secretario-academicos : get all the secretarioAcademicos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of secretarioAcademicos in body
     */
    @RequestMapping(value = "/secretario-academicos",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<SecretarioAcademicoDTO> getAllSecretarioAcademicos() {
        log.debug("REST request to get all SecretarioAcademicos");
        return secretarioAcademicoService.findAll();
    }

    /**
     * GET  /secretario-academicos/:id : get the "id" secretarioAcademico.
     *
     * @param id the id of the secretarioAcademicoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the secretarioAcademicoDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/secretario-academicos/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<SecretarioAcademicoDTO> getSecretarioAcademico(@PathVariable Long id) {
        log.debug("REST request to get SecretarioAcademico : {}", id);
        SecretarioAcademicoDTO secretarioAcademicoDTO = secretarioAcademicoService.findOne(id);
        return Optional.ofNullable(secretarioAcademicoDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /secretario-academicos/:id : delete the "id" secretarioAcademico.
     *
     * @param id the id of the secretarioAcademicoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/secretario-academicos/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteSecretarioAcademico(@PathVariable Long id) {
        log.debug("REST request to delete SecretarioAcademico : {}", id);
        secretarioAcademicoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("secretarioAcademico", id.toString())).build();
    }

}
