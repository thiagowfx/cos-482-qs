package br.ufrj.cos482.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.ufrj.cos482.service.DocumentoSistemaService;
import br.ufrj.cos482.web.rest.util.HeaderUtil;
import br.ufrj.cos482.service.dto.DocumentoSistemaDTO;
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
 * REST controller for managing DocumentoSistema.
 */
@RestController
@RequestMapping("/api")
public class DocumentoSistemaResource {

    private final Logger log = LoggerFactory.getLogger(DocumentoSistemaResource.class);
        
    @Inject
    private DocumentoSistemaService documentoSistemaService;

    /**
     * POST  /documento-sistemas : Create a new documentoSistema.
     *
     * @param documentoSistemaDTO the documentoSistemaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentoSistemaDTO, or with status 400 (Bad Request) if the documentoSistema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/documento-sistemas",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DocumentoSistemaDTO> createDocumentoSistema(@RequestBody DocumentoSistemaDTO documentoSistemaDTO) throws URISyntaxException {
        log.debug("REST request to save DocumentoSistema : {}", documentoSistemaDTO);
        if (documentoSistemaDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("documentoSistema", "idexists", "A new documentoSistema cannot already have an ID")).body(null);
        }
        DocumentoSistemaDTO result = documentoSistemaService.save(documentoSistemaDTO);
        return ResponseEntity.created(new URI("/api/documento-sistemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("documentoSistema", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /documento-sistemas : Updates an existing documentoSistema.
     *
     * @param documentoSistemaDTO the documentoSistemaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentoSistemaDTO,
     * or with status 400 (Bad Request) if the documentoSistemaDTO is not valid,
     * or with status 500 (Internal Server Error) if the documentoSistemaDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/documento-sistemas",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DocumentoSistemaDTO> updateDocumentoSistema(@RequestBody DocumentoSistemaDTO documentoSistemaDTO) throws URISyntaxException {
        log.debug("REST request to update DocumentoSistema : {}", documentoSistemaDTO);
        if (documentoSistemaDTO.getId() == null) {
            return createDocumentoSistema(documentoSistemaDTO);
        }
        DocumentoSistemaDTO result = documentoSistemaService.save(documentoSistemaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("documentoSistema", documentoSistemaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /documento-sistemas : get all the documentoSistemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of documentoSistemas in body
     */
    @RequestMapping(value = "/documento-sistemas",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<DocumentoSistemaDTO> getAllDocumentoSistemas() {
        log.debug("REST request to get all DocumentoSistemas");
        return documentoSistemaService.findAll();
    }

    /**
     * GET  /documento-sistemas/:id : get the "id" documentoSistema.
     *
     * @param id the id of the documentoSistemaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentoSistemaDTO, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/documento-sistemas/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DocumentoSistemaDTO> getDocumentoSistema(@PathVariable Long id) {
        log.debug("REST request to get DocumentoSistema : {}", id);
        DocumentoSistemaDTO documentoSistemaDTO = documentoSistemaService.findOne(id);
        return Optional.ofNullable(documentoSistemaDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /documento-sistemas/:id : delete the "id" documentoSistema.
     *
     * @param id the id of the documentoSistemaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/documento-sistemas/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteDocumentoSistema(@PathVariable Long id) {
        log.debug("REST request to delete DocumentoSistema : {}", id);
        documentoSistemaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("documentoSistema", id.toString())).build();
    }

}
