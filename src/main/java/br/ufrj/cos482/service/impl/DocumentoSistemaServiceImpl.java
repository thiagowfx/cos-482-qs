package br.ufrj.cos482.service.impl;

import br.ufrj.cos482.service.DocumentoSistemaService;
import br.ufrj.cos482.domain.DocumentoSistema;
import br.ufrj.cos482.repository.DocumentoSistemaRepository;
import br.ufrj.cos482.service.dto.DocumentoSistemaDTO;
import br.ufrj.cos482.service.mapper.DocumentoSistemaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DocumentoSistema.
 */
@Service
@Transactional
public class DocumentoSistemaServiceImpl implements DocumentoSistemaService{

    private final Logger log = LoggerFactory.getLogger(DocumentoSistemaServiceImpl.class);
    
    @Inject
    private DocumentoSistemaRepository documentoSistemaRepository;

    @Inject
    private DocumentoSistemaMapper documentoSistemaMapper;

    /**
     * Save a documentoSistema.
     *
     * @param documentoSistemaDTO the entity to save
     * @return the persisted entity
     */
    public DocumentoSistemaDTO save(DocumentoSistemaDTO documentoSistemaDTO) {
        log.debug("Request to save DocumentoSistema : {}", documentoSistemaDTO);
        DocumentoSistema documentoSistema = documentoSistemaMapper.documentoSistemaDTOToDocumentoSistema(documentoSistemaDTO);
        documentoSistema = documentoSistemaRepository.save(documentoSistema);
        DocumentoSistemaDTO result = documentoSistemaMapper.documentoSistemaToDocumentoSistemaDTO(documentoSistema);
        return result;
    }

    /**
     *  Get all the documentoSistemas.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<DocumentoSistemaDTO> findAll() {
        log.debug("Request to get all DocumentoSistemas");
        List<DocumentoSistemaDTO> result = documentoSistemaRepository.findAll().stream()
            .map(documentoSistemaMapper::documentoSistemaToDocumentoSistemaDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one documentoSistema by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public DocumentoSistemaDTO findOne(Long id) {
        log.debug("Request to get DocumentoSistema : {}", id);
        DocumentoSistema documentoSistema = documentoSistemaRepository.findOne(id);
        DocumentoSistemaDTO documentoSistemaDTO = documentoSistemaMapper.documentoSistemaToDocumentoSistemaDTO(documentoSistema);
        return documentoSistemaDTO;
    }

    /**
     *  Delete the  documentoSistema by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DocumentoSistema : {}", id);
        documentoSistemaRepository.delete(id);
    }
}
